import React, { useEffect } from 'react';
import Room from '../Components/Room';
import { useDispatch, useSelector } from 'react-redux'
import { getRooms, resetMyRoom, setMyRoom, setStatus, STATUSES } from '../store/dataSlice';
import {  useNavigate } from 'react-router-dom';
import LoaderSpinner from '../Components/LoaderSpinner';
import { LOGINSTATUS, setLoginStatus, setUserdata } from '../store/userSlice';

const JoinRoomPage = () => {
    const { status, rooms } = useSelector((state) => state.roomdata);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user)
    const { username } = userData;


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

    useEffect(() => {
        function checkRooms() {
            dispatch(getRooms())
        }

        if (rooms.length == 0) {
            dispatch(setStatus(STATUSES.LOADING));
            checkRooms()
        }
        dispatch(resetMyRoom())

    }, [])



    if (status === STATUSES.LOADING) {
        return <LoaderSpinner />
    }
    return (
        <div >
            <h1 className="text-center text-5xl font-bold mb-3 ">Rooms</h1>
            <div className="flex flex-wrap">
                {rooms.map((room, index) => (
                    <Room key={index} name={room.roomname} level={room.difficulty} joined={room.user.length} onJoin={() => handleJoin(room)} />
                ))}
            </div>
        </div>
    );

    function handleJoin(room) {
        dispatch(setMyRoom(room))
        dispatch(setStatus(STATUSES.LOADING))
        //TODO: Which user has joined the room
        // props.socket.emit(ACTIONS.JOIN, {username:"TempUser",roomname:room.roomname});
        var roomid = room.roomname
        navigate('/roompage')
        // navigate(`/batle/${roomid}`);
        // props.socket.emit("start_timer", room.roomname);

    }
};

export default JoinRoomPage;
