import React, { useRef, useState } from 'react'
import AceEditors from '../Components/Ace/AceEditor'
import LoaderSpinner from '../Components/LoaderSpinner'
import Problems from '../Components/Problems/Problems'
import InputTerminal from '../Components/Terminals/InputTerminal'
import Terminal from '../Components/Terminals/Terminal'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomByName, joinRoom, leaveRoom, setNext, setPrev, setStatus, STATUSES } from '../store/dataSlice'
import { useEffect } from 'react'
import { resetMyCode, setMyCode, setMyInput, setMyLang, setQid, setTitleSlug, setvisited } from '../store/codeSlice'
import ACTIONS from '../Actions'
import toast, { Toaster } from 'react-hot-toast';
import { initSocket } from '../socket'
import ChatComponent from '../Components/Chat/ChatComponent'
// import { useParams } from 'react-router-dom'


const RoomPage = () => {

    const [question, setquestion] = useState();
    const [title, setTitle] = useState();
    const [difficulty, setDifficulty] = useState();
    const [lang, setlang] = useState('java');
    const [timer, setTimer] = useState({ h: 0, m: 0, s: 0 });
    const { status: roomstatus, myroom, Number: number } = useSelector((state) => state.roomdata)
    const { problems, roomname, ownername } = myroom

    const dispatch = useDispatch();
    const { visited, mycode, input,status:codeStatus } = useSelector((state) => state.code)

    const { userData } = useSelector((state) => state.user)
    const { username } = userData;
    // const { roomid } = useParams();


    /* JOIN ROOM FROM THE LINK ================================================================================*/
    /*  useEffect(() => {
         console.log(roomid)
         function getRoomByLink() {
             dispatch(getRoomByName(roomid))
         }
         getRoomByLink()
     }, []) */
    /* ======================================================================================================= */
    useEffect(() => {

        function fetchRoomData(){

            dispatch(resetMyCode())
            setDifficulty(problems[number].question.difficulty)
            setquestion(problems[number].problem)
            setTitle(problems[number].question.title)
            dispatch(setMyLang(lang))
            dispatch(setTitleSlug(problems[number].question.titleSlug))
            let inputstring = "";
            problems[number].testcases.data.question.exampleTestcaseList.forEach(element => {
                inputstring += element + '\n'
            });
            dispatch(setMyInput(inputstring))
            dispatch(setQid(problems[number].editordata.data.question.questionId))
            let obj = problems[number].editordata.data.question.codeSnippets.find(o => o.langSlug === lang);
            dispatch(setMyCode(obj.code))
            // dispatch(setStatus(STATUSES.IDLE))
            // setCode(obj.code)
        }

        if(problems) {
            fetchRoomData();
        }

    }, [roomstatus,problems,number])


    /* Socket Code================================================================================================================== */
    const socketRef = useRef(null);
    const [clients, setClients] = useState();


    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            //Join The Room
            dispatch(joinRoom(roomname, username))
            socketRef.current.emit(ACTIONS.JOIN, {
                roomname,
                username: username,
            });
            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    toast.success(`${username} joined the room.`);
                    console.log(`${username} joined`);

                    setClients(clients);


                }
            );

            // Listening for disconnected
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            dispatch(leaveRoom(roomname, username))
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, [])

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.NewTime, (data) => {
                setTimer(data)
            })
        }

        return () => {
            socketRef.current.off(ACTIONS.NewTime);
        };
    }, [socketRef.current]);


    if (roomstatus === STATUSES.LOADING||codeStatus===STATUSES.LOADING || myroom == null || problems == null || problems.length == 0) {
        return <LoaderSpinner />
    }

    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <div >
                <div className="flex">
                    <div className="w-[30%] h-[100vh] flex flex-col justify-between mx-3">
                        <Problems question={question} title={title} difficulty={difficulty} next={handleNext} prev={handlePrev} />
                    </div>
                    <main role="main" className="w-[60%]  ">
                        <AceEditors code={mycode} lang={lang} setlangHandler={setlangHandler} timer={timer} socket={socketRef} roomname={roomname} ownerName={ownername} getCodeHandler={getCodeHandler} />
                    </main>
                    <div className="w-[25%] h-[100vh]">
                        <div className="flex flex-col justify-between h-[100%]">
                            <InputTerminal getInput={getInput} input={input} resetTestcases={resetTestcases} />
                            <Terminal />
                            <ChatComponent socket={socketRef}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    function resetTestcases() {
        let inputstring = "";
        problems[number].testcases.data.question.exampleTestcaseList.forEach(element => {
            inputstring += element + '\n'
        });
        dispatch(setMyInput(inputstring))
    }


    function getCodeHandler(e) {
        console.log(e)
        dispatch(setMyCode(e))
    }

    function setlangHandler(e) {
        console.log(e.target.value)
        setlang(e.target.value);
        let obj = problems[number].editordata.data.question.codeSnippets.find(o => o.langSlug === e.target.value);
        dispatch(setMyCode(obj.code))
    }

    function getInput(e) {
        console.log(e.target.value)
        dispatch(setMyInput(e.target.value))
    }

    function handleNext() {
        dispatch(setNext())

    }
    function handlePrev() {
        dispatch(setPrev())

    }
}

export default RoomPage