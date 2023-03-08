import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

export const LOGINSTATUS = Object.freeze({
    LOGEDIN: "logedin",
    NOTLOGEDIN: "notlogedin",
});


const initialState = {
    userData:{},
    status:STATUSES.IDLE,
    loginStatus:LOGINSTATUS.NOTLOGEDIN
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
   
        setUserdata:(state,action)=>{
            state.userData = action.payload;
        },

        setStatus:(state,action)=>{
            state.status = action.payload;
        },

        setLoginStatus:(state,action)=>{
            state.loginStatus = action.payload;
        },
    }
})

export const {setStatus,setUserdata,setLoginStatus} = userSlice.actions;
export default userSlice.reducer;



export function validateUser(cokkie,username){
    return async function validateUserThunk(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            
            var data = JSON.stringify({
                "username":username,
                "cokkie":cokkie
            })

            var config = {
                method:'Post',
                maxBodyLength:Infinity,
                url:`${import.meta.env.VITE_API_BASE_URL}/validate/`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };
            const res = await axios(config)
            console.log(res.data.success);
            dispatch(setStatus(STATUSES.IDLE));
            if(res.data.success===true) {
                dispatch(setUserdata(JSON.parse(data)));
                dispatch(setLoginStatus(LOGINSTATUS.LOGEDIN));
            }
            
            
        } catch (error) {
            console.error(error.message);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}