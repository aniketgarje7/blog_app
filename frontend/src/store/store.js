import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import blogReducer from './slices/BlogSlice';
import commentReducer from './slices/CommentSlice';
import userReducer from './slices/UserSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blog:blogReducer,
        comment:commentReducer,
        user:userReducer
    },
});