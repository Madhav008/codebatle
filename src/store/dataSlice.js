import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});
export const ROOMSTATUS = Object.freeze({
    IN_ROOM: "in_room",
    OUT_ROOM: "out_room",
});
const initialState = {
    myroom: {},
    rooms: [],
    Number: 0,
    status: STATUSES.IDLE,
    roomStatus: ROOMSTATUS.OUT_ROOM

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setMyRoom: (state, action) => {
            state.myroom = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setNext(state) {
            if (state.Number === 3) {
                state.Number = 0;
            } else {
                state.Number = state.Number + 1;
            }
        },
        setPrev(state) {
            if (state.Number === 0) {
                state.Number = 3;
            } else {
                state.Number = state.Number - 1;
            }
        }, setRoomStatus: (state, action) => {
            state.roomStatus = action.payload;
        },
        resetMyRoom(state) {
            state.myroom = {};
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMyRoom, setRooms, setStatus, setNext, setPrev, resetMyRoom,setRoomStatus } = dataSlice.actions

export default dataSlice.reducer
export function leaveRoom(roomName, username) {
    return async function createroomThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var data = JSON.stringify({
                "roomname": roomName,
                "name": username
            });

            var config = {
                method: 'Post',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_BASE_URL}/leave`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };


            const res = await axios(config)
            dispatch(setRoomStatus(ROOMSTATUS.OUT_ROOM))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function joinRoom(roomName, username) {
    return async function createroomThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var data = JSON.stringify({
                "roomname": roomName,
                "name": username
            });

            var config = {
                method: 'Post',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_BASE_URL}/join`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };


            const res = await axios(config)
            dispatch(setRoomStatus(ROOMSTATUS.IN_ROOM))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function createroom(difficulty, roomName, username) {
    return async function createroomThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var data = JSON.stringify({
                "level": difficulty,
                "roomname": roomName,
                "name": username,
            });

            var config = {
                method: 'Post',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_BASE_URL}/create`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };


            const res = await axios(config)
            dispatch(setMyRoom(res.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function getRooms() {
    return async function getRoomsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            var config = {
                method: 'GET',
                url: `${import.meta.env.VITE_API_BASE_URL}/getRooms`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
            };


            const res = await axios(config)
            dispatch(setRooms(res.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function getRoomByName(roomname) {
    return async function getRoomsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            var config = {
                method: 'GET',
                url: `${import.meta.env.VITE_API_BASE_URL}/room/${roomname}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
            };


            const res = await axios(config)
            dispatch(setMyRoom(res.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(err);
        }
    };
}