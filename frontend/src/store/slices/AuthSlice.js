import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/AuthServices';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user:null,
        error:null,
        success:null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        unSetUser:(state,action)=>{
            state.user = null;
        },
        setError:(state,action)=>{
            state.error = action.payload;
            state.success = null;
        },
        unSetError:(state,action)=>{
            state.error = null;
        },
        setSuccess:(state,action)=>{
            state.success = action.payload;
            state.error = null;
        },
        unSetSuccess:(state,action)=>{
            state.success = null;
        }

    },
});

export const { setUser, unSetUser,setError,unSetError ,setSuccess,unSetSuccess} = authSlice.actions;

export const logIn = (payload) => (dispatch) => {
    return authService.logIn(payload).then((response) => {
        response.data?
        (()=>{
        const token = response.data.token;
        localStorage.setItem('ba_token',token);
        dispatch(setUser(response.data))   
        dispatch(setSuccess(response.data))
        })():
        dispatch(setError(response.error));
        return response;
    }, (error) => {
        console.log(error,'error login function');
        return error;
    }
    );
}

export const signUp = (payload) => (dispatch) => {
    return authService.signUp(payload).then((response) => {
        response.data?
        dispatch(setSuccess(response.data)):
        dispatch(setError(response.error));
        return response;
    }, (error) => {
        console.log(error,'error');
        return error;
    }
    );
}

export const getUser = () => (dispatch) => {
    return authService.getUser().then((response) => {
        response.data?
        dispatch(setUser(response.data)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error login function');
        return false;
    }
    );
}

export const selectUser = (state) => state.auth.user;
export const selectError = (state) =>state.auth.error;
export const selectSuccess = (state)=>state.auth.success;
export default authSlice.reducer;