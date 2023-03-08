import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createroom } from '../store/dataSlice';
import { LOGINSTATUS, validateUser } from '../store/userSlice';

const LoginPage = () => {

    const [cokkie, setcokkie] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch()


    return (
        <div className="flex justify-center items-center h-screen ">
            <div className=" p-6 rounded-lg shadow-md bg-gray-900 w-72">
                <h2 className="text-xl font-medium mb-4">Login Using Leetcode</h2>


                <div className="mb-4">
                    <label className="block font-medium mb-2">Username</label>
                    <input
                        type="text"
                        className="-300 p-2 rounded-lg"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)

                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Cokkie</label>
                    <input
                        type="text"
                        className="-300 p-2 rounded-lg"
                        value={cokkie}
                        onChange={(e) => setcokkie(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit} className="btn text-white py-2 px-4 rounded-lg hover:-700">
                    Login
                </button>
            </div>
        </div>
    )

    function handleSubmit() {

        if (!cokkie || !username) {
            return;
        }
        dispatch(validateUser(cokkie, username))
        console.log("User validated");

        // props.socket.emit(ACTIONS.JOIN, {username,roomname:roomName});
    }
}

export default LoginPage