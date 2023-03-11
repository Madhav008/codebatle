import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createroom, resetMyRoom, setStatus, STATUSES } from '../store/dataSlice';

const CreateRoomPage = () => {
    const [difficulty, setDifficulty] = useState('');
    const [roomName, setRoomName] = useState('');
    // const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.user)
    const {username} = userData;
    return (
        <div className="flex justify-center items-center h-screen ">
            <div className=" p-6 rounded-lg shadow-md bg-gray-900 w-72">
                <h2 className="text-xl font-medium mb-4">Create a Room</h2>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Difficulty</label>
                    <select
                        className="p-2 rounded-lg w-full"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">Select Difficulty</option>
                        <option value="novice">Easy</option>
                        <option value="intermediate">Medium</option>
                        <option value="expert">Hard</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Room Name</label>
                    <input
                        type="text"
                        className="-300 p-2 rounded-lg"
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                            
                        }}
                    />
                </div>
               {/*  <div className="mb-4">
                    <label className="block font-medium mb-2">Username</label>
                    <input
                        type="text"
                        className="-300 p-2 rounded-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div> */}
                <button onClick={handleSubmit} className="btn text-white py-2 px-4 rounded-lg hover:-700">
                    Create Room
                </button>
            </div>
        </div>
    )


    function handleSubmit() {

        if (!difficulty || !roomName || !username) {
            return;
        }
        dispatch(resetMyRoom())
        dispatch(createroom(difficulty, roomName, username))
        dispatch(setStatus(STATUSES.LOADING))
        navigate('/batle');
        
        // props.socket.emit(ACTIONS.JOIN, {username,roomname:roomName});
    }
}

export default CreateRoomPage