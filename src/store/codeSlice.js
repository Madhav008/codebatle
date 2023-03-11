import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});



const initialState = {
    mycode: {},
    visited: {},
    input: {},
    myoutput: {},
    titleSlug: {},
    language: {},
    qid:{},
    status: STATUSES.IDLE,
    outputStatus:STATUSES.IDLE,
}


export const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {

        setvisited: (state, action) => {
            state.visited[action.payload] = true;
        },

        setMyCode: (state, action) => {
            state.mycode = action.payload;
        },

        setMyInput: (state, action) => {
            state.input = action.payload
        },

        setMyOutput: (state, action) => {
            state.myoutput = action.payload
        },

        setTitleSlug: (state, action) => {
            state.titleSlug = action.payload
        },

        setMyLang: (state, action) => {
            state.language = action.payload
        },

        setStatus(state, action) {
            state.status = action.payload;
        },
        setOutputStatus(state, action) {
            state.outputStatus = action.payload;
        },
        setQid(state, action) {
            state.qid = action.payload;
        },
        resetMyCode: (state, action) => {
            return initialState;
        }
    }
})

export const { setMyCode, resetMyCode, getMyCode, setvisited, setMyInput, setMyOutput, setTitleSlug, setMyLang,setStatus,setOutputStatus,setQid } = codeSlice.actions
export default codeSlice.reducer

export function runCode(titleSlug, code, testcases, language,qid) {
    return async function runCodeThunk(dispatch, getState) {
        dispatch(setOutputStatus(STATUSES.LOADING));
        const username = getState().user.userData.username;
        try {
            var data = JSON.stringify({
                "titleSlug": titleSlug,
                "code": code,
                "testcases": testcases,
                "lang": language,
                "qid": qid,
                "username":username,
            });

            var config = {
                method: 'Post',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_BASE_URL}/run`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };


            const res = await axios(config)
            dispatch(setMyOutput(res.data));
            dispatch(setOutputStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setOutputStatus(STATUSES.ERROR));
        }
    };
}
export function submitCode(titleSlug, code, testcases, lang,qid) {
    return async function submitCodeThunk(dispatch, getState) {
        dispatch(setOutputStatus(STATUSES.LOADING));
        const username = getState().user.userData.username;
        try {
            var data = JSON.stringify({
                "titleSlug": titleSlug,
                "code": code,
                "testcases": testcases,
                "lang": lang,
                "qid": qid,
                "username": username,

            });

            var config = {
                method: 'Post',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_BASE_URL}/submit`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };


            const res = await axios(config)
            dispatch(setMyOutput(res.data));
            dispatch(setOutputStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setOutputStatus(STATUSES.ERROR));
        }
    };
}