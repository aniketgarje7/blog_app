import {createSlice} from '@reduxjs/toolkit';
import { CommentService } from '../services/CommentService';
import { toast } from 'react-toastify';

export const commentSlice = createSlice({
    name:'comment',
    initialState:{
        data:[],
        error:null,
        success:null,
    },
    reducers:{
        setData:(state,action)=>{
            const data = action.payload.filter((comment)=>{
                const commentsId = state.data.map((c)=>c._id);
                if(commentsId.includes(comment._id)){
                    return false;
                }
                return true;
            })
            state.data = [...state.data,...data];
        },
        unSetData:(state,action)=>{
            state.data = [];
        },
        setError:(state,action)=>{
            state.error = action.payload;
            state.success = null;
            toast.error(action.payload);
        },
      
        setSuccess:(state,action)=>{
            state.success = action.payload;
            state.error = null;
            toast.success(action.payload);
        },
        setDataById:(state,action)=>{
            const id = action.payload._id;
            const index = state.data.findIndex((obj)=>obj._id===id);
            state.data[index] = action.payload;
        }
      
    }
});

export const {setData,unSetData,setError,setSuccess,setDataById} = commentSlice.actions;

export const createComment = (payload)=>(dispatch)=>{
    return CommentService.createComment(payload).then((response)=>{
        response.data?
        dispatch(setSuccess(response.message)):
        dispatch(setError(response.message));
        return response.data?true:false;
    },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
    })
};

export const getComments = (payload)=>(dispatch)=>{
      return CommentService.getComments(payload).then((response)=>{
        response?.data?
        dispatch(setData(response.data))
        :
        dispatch(setError(response.message));
        return response.data && response.data.length>4?true:false;
      },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
      })
};


export const likeComment = (payload)=>(dispatch)=>{
    return CommentService.likeComment(payload).then((response)=>{
        response?.data?
        dispatch(setDataById(response.data)):
        dispatch(setError(response.message));
        return response.data?true:false;
    },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
    })
};
export const selectData = (state) => state.comment.data;
export const selectError = (state) =>state.comment.error;
export const selectSuccess = (state)=>state.comment.success;

export default commentSlice.reducer;