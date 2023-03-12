import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import { leaveRoom } from '../../store/dataSlice';

const ChatComponent = ({ socket, clients }) => {

    const { users, roomname } = useSelector((state) => state.roomdata.myroom)
    const { username } = useSelector((state) => state.user.userData)
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentMessage, setCurrentMessage] = useState([])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive_message", (data) => {
                setCurrentMessage((list) => [...list, data])
                console.log(data);
            })
        }

    }, [socket.current])

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };


    const sendMsg = () => {
        if (message !== "") {
            const data = {
                roomname: roomname,
                author: username,
                message: message,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            // setCurrentMessage((list)=>[...list,data])
            socket.current.emit("send_message", data);
            setMessage("");
        }
    };


    return (

        <div className='h-max'>
            <div className="w-full px-5 flex flex-col justify-between   ">
                {/* Header */}
                <div className="flex  py-3 border-b-2 justify-between">
                    {/* <div className=" flex items-center justify-between gap-2 m-auto">

<div className="badge badge-primary text-white">Invite</div>
<div onClick={() => { dispatch(leaveRoom()); navigate(`/`) }} className="badge badge-accent text-white">Leave</div>
{users&&<div className="badge badge-lg "> Joined {users.length}</div>}
</div> */}

                    <h1><span className='text-lg font-bold text-white'>Roomname: </span>{roomname}  </h1>
                    <h1 className='text-lg font-bold text-white'> Users {clients.length}</h1>
                </div>
                <ScrollToBottom className='h-[850px]'>
                    {/* Chat Messages */}
                    {

                        currentMessage ? currentMessage.map((data, index) => (
                            <div key={index}>
                                {
                                    data.author === username ? (
                                        <div className="chat chat-end">
                                            <div className="chat-bubble chat-bubble-primary opacity-[0.8]">{data.message}</div>
                                        </div>
                                    ) : (
                                        <div className="chat chat-start">
                                            <div className="chat-bubble chat-bubble-primary opacity-[0.8]">{data.message}</div>
                                        </div>
                                    )
                                }
                            </div>
                        )) : null
                    }
                </ScrollToBottom>

            </div>
            {/* Send Messages Form */}
            <div className="h-[10px] m-0 divider"></div>

            <div className="flex flex-row mt-2 mb-1 rounded-xl w-full px-4 ">
                <div className="flex-grow ml-2 mr-2">
                    <div className="relative">
                        <div className='flex border rounded-xl justify-between p-2 h-10'>

                            <input onKeyDown={(event) => {
                                event.key === "Enter" && sendMsg();
                            }} onChange={handleMessageChange} value={message} type="text" className="focus:outline-none bg-transparent w-[90%]"></input>

                            <button onClick={sendMsg} className="flex items-center justify-center h-full mx-3">
                                <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent