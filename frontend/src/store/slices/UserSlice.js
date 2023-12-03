import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { authService } from "../services/AuthServices";

const userSlice = createSlice({
    name:'user',
    initialState:{
        searchData:[],
        isLoading:false,
        error:null,
        success:null,
        whoToFollowData:[],
    },
    reducers:{
        setSearchData:(state,action)=>{
            state.searchData = action.payload;
        },
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload;
            state.success = null;
            toast.error(action.payload);
        },
        setSuccess:(state,action)=>{
            state.success = action.payload;
            state.error = null;
        },
        setWhoToFollowData:(state,action)=>{
            state.whoToFollowData = action.payload;
        }
    }
});

export const {setSearchData,setError,setSuccess,setWhoToFollowData} = userSlice.actions;

export const getUsersByQuery = (payload) => (dispatch) => {
    return authService.getUsersByQuery(payload).then((response) => {
        response.data?
        dispatch(setSearchData(response.data)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error getusersbyquery');
        return false;
    }
    );
};

export const getUserWhotoFollow = () => (dispatch) => {
    return authService.getUsersByQuery("").then((response) => {
        response.data?
        dispatch(setWhoToFollowData(response.data)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error getusersbyquery');
        return false;
    }
    );
};
export const followUser = (payload) => (dispatch) => {
    return authService.followUser(payload).then((response) => {
        response.data?
        dispatch(setSuccess(response.message)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error followUser');
        return false;
    }
    );
};

export const seletcSearchData = (state)=>state.user.searchData;
export  const selectIsLoading = (state)=>state.user.isLoading;
export const selectWhotoFollowData = (state)=>state.user.whoToFollowData;

export default userSlice.reducer;