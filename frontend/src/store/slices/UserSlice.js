import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { authService } from "../services/AuthServices";
import { userService } from "../services/UserService";

const userSlice = createSlice({
    name:'user',
    initialState:{
        searchData:[],
        isLoading:false,
        error:null,
        success:null,
        whoToFollowData:[],
        userBlogs:[],
        profileUser:null,
        menuActiveItem:'Home'
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
        },
        setUsersBlogs:(state,action)=>{
            state.userBlogs = action.payload;
        },
        setProfileUser:(state,action)=>{
            state.profileUser = action.payload;
        },
        setMenuActiveItem:(state,action)=>{
            state.menuActiveItem = action.payload;
        },
        setBlogsAndUser:(state,action)=>{
            state.userBlogs = action.payload?.blogs;
            state.profileUser = action.payload?.user;
        }
    }
});

export const {setSearchData,setError,setSuccess,setWhoToFollowData,setUsersBlogs,setProfileUser,setMenuActiveItem,setBlogsAndUser} = userSlice.actions;

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
    return userService.followUser(payload).then((response) => {
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

export const unFollowUser = (payload) => (dispatch) => {
    return userService.unFollowUser(payload).then((response) => {
        response.data?
        dispatch(setSuccess(response.message)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error unFollowUser');
        return false;
    }
    );
};
export const getBlogsByUsername = (payload) => (dispatch) => {
    return userService.getBlogsByUsername(payload).then((response) => {
        response.data?
        dispatch(setBlogsAndUser(response.data)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error getBlogsByUsername');
        return false;
    }
    );
};
export const getUserByUsername = (payload) => (dispatch) => {
    return userService.getUserByUsername(payload).then((response) => {
        response.data?
        dispatch(setProfileUser(response.data)):
        dispatch(setError(response.error));
        return response.data?true:false;
    }, (error) => {
        console.log(error,'error getUserByUsername');
        return false;
    }
    );
};
export const seletcSearchData = (state)=>state.user.searchData;
export  const selectIsLoading = (state)=>state.user.isLoading;
export const selectWhotoFollowData = (state)=>state.user.whoToFollowData;
export const selectUserBlogs = (state)=>state.user.userBlogs;
export const selectProfileUser = (state)=>state.user.profileUser;
export const selectMenuActiveItem = (state)=>state.user.menuActiveItem;
export default userSlice.reducer;