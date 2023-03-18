import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createroom } from '../store/dataSlice';
import { LOGINSTATUS, setLoginStatus, setUserdata, validateUser } from '../store/userSlice';

const LoginPage = () => {

    const [cokkie, setcokkie] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        function fetchUser() {
            var data = localStorage.getItem('dataKey');
            data = JSON.parse(JSON.parse(data));

            if (data.username) {
                dispatch(setUserdata(data))
                dispatch(setLoginStatus(LOGINSTATUS.LOGEDIN));
            }
        }
        // console.log(localStorage.getItem('dataKey'))
        if (localStorage.getItem('dataKey') != null) {
            fetchUser();
        }
    }, [])


    return (
        <div className='flex-col h-screen justify-between'>
            <div className="flex justify-center items-center h-[90%]">
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

            <div>
                <h4 className='text-xl font-bold text-center mt-3'>
                    Built with 💛&nbsp;by&nbsp;
                    <a href="https://github.com/madhav008" className='text-green-500'>Hari</a>
                </h4>
            </div>

        </div>
    )

    function handleSubmit() {

        if (!cokkie || !username) {
            return;
        }

        dispatch(validateUser(cokkie, username.toLowerCase()))
        console.log("User validated");

        // props.socket.emit(ACTIONS.JOIN, {username,roomname:roomName});
    }
}

export default LoginPage