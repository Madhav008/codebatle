import Split from 'react-split'
import React, { useRef, useState } from 'react'
import LoaderSpinner from '../Components/LoaderSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomByName, joinRoom, leaveRoom, setNext, setPrev, setStatus, STATUSES } from '../store/dataSlice'
import { useEffect } from 'react'
import { resetMyCode, runCode, setMyCode, setMyInput, setMyLang, setQid, setTitleSlug, setvisited, submitCode } from '../store/codeSlice'
import ACTIONS from '../Actions'
import toast, { Toaster } from 'react-hot-toast';
import { initSocket } from '../socket'
import ChatComponent from '../Components/Chat/ChatComponent'
import Problems from './Problems/Problems'
import AceEditors from './Ace/AceEditor'
import InputTerminal from './Terminals/InputTerminal'
import Terminal from './Terminals/Terminal'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
// import { useParams } from 'react-router-dom'
import '../Components/Ace/ace.css'

const ResizableRoomPage = () => {

    const [question, setquestion] = useState();
    const [title, setTitle] = useState();
    const [difficulty, setDifficulty] = useState();
    const [chat, setChat] = useState(true);
    const [lang, setlang] = useState('java');
    const [timer, setTimer] = useState({ h: 0, m: 0, s: 0 });
    const { status: roomstatus, myroom, Number: number } = useSelector((state) => state.roomdata)
    const { problems, roomname, ownername } = myroom

    const dispatch = useDispatch();
    const { visited, mycode, input, status: codeStatus } = useSelector((state) => state.code)

    const { userData } = useSelector((state) => state.user)
    const { username } = userData;
    // const { roomid } = useParams();

    const [Console, setConsole] = useState("hidden");


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

        function fetchRoomData() {

            dispatch(resetMyCode())
            setDifficulty(problems[number].question.difficulty)
            setquestion(problems[number].problem)
            setTitle(problems[number].question.title)
            dispatch(setMyLang(lang))
            dispatch(setTitleSlug(problems[number].question.titleSlug))
            let obj = problems[number].editordata.data.question.codeSnippets.find(o => o.langSlug === lang);
            dispatch(setMyCode(obj.code))
            let inputstring = "";
            problems[number].testcases.data.question.exampleTestcaseList.forEach(element => {
                inputstring += element + '\n'
            });
            dispatch(setMyInput(inputstring))
            dispatch(setQid(problems[number].editordata.data.question.questionId))

            // dispatch(setStatus(STATUSES.IDLE))
            // setCode(obj.code)
        }

        if (problems) {
            fetchRoomData();
        }

    }, [roomstatus, problems, number])


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
            if (username && roomname) {
                dispatch(joinRoom(roomname, username))
            }

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
            if (username && roomname) {
                dispatch(leaveRoom(roomname, username))
            }
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

    // const [input, setInput] = useState("");
    const [type, setType] = useState("");
    const [terminalInput, setInput] = useState("");
    const { input: myInput, titleSlug, language, qid, myoutput, outputStatus: loadingStatus } = useSelector((state) => state.code)


    // const { input: myInput, titleSlug, language, mycode, qid, myoutput, outputStatus: loadingStatus } = useSelector((state) => state.code)
    if (roomstatus === STATUSES.LOADING || codeStatus === STATUSES.LOADING || myroom == null || problems == null || problems.length == 0) {
        return <LoaderSpinner />
    }


    return (
        // <Split direction="vertical" style={{ height: '100vh' }} className='m-0'  >
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
            <Split sizes={[30, 70, 20]}
                minSize={400} className='flex ' style={{ height: '100vh' }}>
                <div className="w-[30%] h-[100vh] flex flex-col justify-between mx-3">
                    <Problems question={question} title={title} difficulty={difficulty} next={handleNext} prev={handlePrev} />
                </div>
                <main role="main" className="w-[70%] relative ">
                    <AceEditors code={mycode} lang={lang} setlangHandler={setlangHandler} timer={timer} socket={socketRef} roomname={roomname} ownerName={ownername} getCodeHandler={getCodeHandler}
                        socketRef={socketRef}
                        clients={clients}
                        resetTestcases={resetTestcases}
                        getInput={getInput}
                        input={input}
                    />
                    {
                        loadingStatus == STATUSES.LOADING ? <div className={`bg-gray-700 p-4  text-white align-middle text-center  ${Console} justify-between h-[250px] mb-4 w-[100%] absolute z-10 bottom-10 `}>
                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 mt-[100px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div> :
                            <div className={`flex ${Console} justify-between h-[250px] mb-4 w-[100%] absolute z-10 bottom-10 right-20px left-20px `}>
                                <InputTerminal getInput={getInput} input={input} resetTestcases={resetTestcases} />
                                <Terminal input={terminalInput} type={type} run={run} submit={submit} />
                            </div>
                    }


                    <div className="items-center w-[100%] flex bg-slate-900 px-2">
                        <p className="text-lg font-semibold flex "
                            onClick={handleConsole}
                        >Console
                            {<MdOutlineArrowDropUp className={`${Console} my-1`} />} {<MdOutlineArrowDropDown className={`my-1  ${Console === "" ? 'hidden' : ""}`} />}
                        </p>
                        <div className="flex ml-auto mt-4 align-middle text-center ">
                            <button className="bg-blue-500 px-1 py-1 m-1  rounded-lg  text-white mr-4" onClick={submit} >
                                Submit
                            </button>
                            <button className="bg-blue-500 px-1 py-1 m-1 rounded-lg  text-white" onClick={run} >
                                Run
                            </button>
                        </div>
                    </div>
                </main>

                <div className="w-[25%] h-[60vh]">
                    {socketRef.current && <ChatComponent socket={socketRef} clients={clients} />}
                </div>

            </Split>
        </>

    )

    function submit() {
        dispatch(submitCode(titleSlug, mycode, myInput, language, qid))
        setType('submit');
        setConsole("")
    };

    function run() {
        dispatch(runCode(titleSlug, mycode, myInput, language, qid))
        setType('run');
        setInput(myInput);
        setConsole("")
    };

    function handleConsole() {
        setConsole((val) => {
            if (val === 'hidden') {
                return '';
            } else {
                return 'hidden';
            }
        });
    }

    function resetTestcases() {
        let inputstring = "";
        problems[number].testcases.data.question.exampleTestcaseList.forEach(element => {
            inputstring += element + '\n'
        });
        dispatch(setMyInput(inputstring))
    }


    function getCodeHandler(e) {
        // console.log(e)
        dispatch(setMyCode(e))
    }

    function setlangHandler(e) {
        // console.log(e.target.value)
        setlang(e.target.value);
        let obj = problems[number].editordata.data.question.codeSnippets.find(o => o.langSlug === e.target.value);
        dispatch(setMyCode(obj.code))
    }

    function getInput(e) {
        // console.log(e.target.value)
        dispatch(setMyInput(e.target.value))
    }

    function handleNext() {
        dispatch(setNext())

    }
    function handlePrev() {
        dispatch(setPrev())

    }
}

export default ResizableRoomPage