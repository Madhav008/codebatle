import React from 'react';
import Room from '../Components/Room';
import { useDispatch, useSelector } from 'react-redux'
import { setMyRoom, setStatus, STATUSES } from '../store/dataSlice';
import { useNavigate } from 'react-router-dom';

const JoinRoomPage = () => {
    const {status,rooms} = useSelector((state)=>state.roomdata);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userData} = useSelector((state)=>state.user)
    const {username} = userData;
    if (status===STATUSES.LOADING) {
        return <LoaderSpinner />
    }
    return (
        <div >
            <h1 className="text-center text-5xl font-bold mb-3 ">Rooms</h1>
            <div className="flex flex-wrap">
                {rooms.map((room,index) => (
                    <Room key={index} name={room.roomname} level={room.difficulty} joined={room.user.length} onJoin={()=>handleJoin(room)}/>
                ))}
            </div>
        </div>
    );

function handleJoin(room){
    dispatch(setMyRoom(room))
    dispatch(setStatus(STATUSES.LOADING))
    //TODO: Which user has joined the room
    // props.socket.emit(ACTIONS.JOIN, {username:"TempUser",roomname:room.roomname});
    navigate('/batle');
    // props.socket.emit("start_timer", room.roomname);

}
};

export default JoinRoomPage;
