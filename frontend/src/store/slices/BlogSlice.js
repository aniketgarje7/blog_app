import {createSlice} from '@reduxjs/toolkit';
import { blogService } from '../services/BlogService';
import { toast } from 'react-toastify';

export const blogSlice = createSlice({
    name:'blog',
    initialState:{
        data:[],
        error:null,
        success:null,
        isNoData:false,
        aiContent:null,
    },
    reducers:{
        setData:(state,action)=>{
            state.data = [...state.data,...action.payload];
            if(action.payload?.length===0){
                state.isNoData = true;
            }
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
        },   
        setDataByBlog:(state,action)=>{
            state.data = [action.payload,...state.data];
        },
        setDataByDelete:(state,action)=>{
            const id = action.payload._id;
            const index = state.data.findIndex((obj)=>obj._id===id);
            state.data = state.data.filter((_,i)=>Number(index)!==Number(i));
        },
        setAicontent:(state,action)=>{
            state.aiContent = action.payload;
        }
    }
});

export const {setData,unSetData,setError,setSuccess,setDataById,setIsNoData,setDataByBlog,setDataByDelete,setAicontent} = blogSlice.actions;

export const createBlog = (payload)=>(dispatch)=>{
    return blogService.createBlog(payload).then((response)=>{
        response.data?(()=>{
            dispatch(setSuccess(response.message));
            dispatch(setDataByBlog(response.data));
        })()
        :
        dispatch(setError(response.message));
        return response.data?true:false;
    },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
    })
};

export const getBlogs = (payload)=>(dispatch)=>{
      return blogService.getBlogs(payload).then((response)=>{
        response?.data?
        dispatch(setData(response.data))
        :
        dispatch(setError(response.message));
        return response.data?true:false;
      },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
      })
};


export const editBlog = (payload)=>(dispatch)=>{
    return blogService.editBlog(payload).then((response)=>{
        response?.data?
        (()=>{
            dispatch(setSuccess(response.message));
            dispatch(setDataByBlog(response.data));
        })():
        dispatch(setError(response.message));
        return response.data?true:false;
    },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
    })
};
export const deleteBlog = (payload)=>(dispatch)=>{
    return blogService.deleteBlog(payload).then((response)=>{
        response?.data?
        (()=>{
            dispatch(setSuccess(response.message));
            dispatch(setDataByDelete(response.data));
        })():
        dispatch(setError(response.message));
        return response.data?true:false;
    },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
    })
};

export const likeBlog = (payload)=>(dispatch)=>{
    return blogService.likeBlog(payload).then((response)=>{
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

export const rewriteTextByAI = (payload)=>(dispatch)=>{
    return blogService.rewriteTextByAI(payload).then((response)=>{
        response?.data?
        dispatch(setAicontent(response.data.message?.content)):
        dispatch(setError(response.message));
        return response.data?true:false;
    },(error)=>{
        dispatch(setError(error.message));
        console.log(error,'error');
        return false;
    })
};
export const selectData = (state) => state.blog.data;
export const selectError = (state) =>state.blog.error;
export const selectSuccess = (state)=>state.blog.success;
export const selectIsNoData = (state)=>state.blog.isNoData;
export const selectAiContent = (state)=>state.blog.aiContent;
export default blogSlice.reducer;