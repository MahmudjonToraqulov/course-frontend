import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {handleErrorMessage, handleAsyncThunk} from "../../utils/index.js";

const serverUrl = import.meta.env.VITE_REACT_APP_API_URL + "/comments"

export const getAllComments = createAsyncThunk('comments/getAllComments', async function (_, thunkApi){
    console.log('start')
    return await handleAsyncThunk(serverUrl, 'get', {}, thunkApi)
})

export const refreshComments = createAsyncThunk('comments/refreshComments', async function (_, thunkApi){
    return await handleAsyncThunk(serverUrl, 'get', {}, thunkApi)
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async function (data, thunkApi){
    return await handleAsyncThunk(serverUrl+`/${data.id}`, 'delete', {}, thunkApi, data?.handleIfSuccess)
})

const initialState = {
    comments: [],
    loading: false,
}

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        deleteCommentLocally: (state, action)=>{
            console.log(action.payload)
            state.comments=state.comments.filter(comment=>comment.id!==action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllComments.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, 'Cannot get comments')
            })

            .addCase(deleteComment.rejected, (state, action) => {
                handleErrorMessage(action, 'Cannot delete comment')
            })

            .addCase(refreshComments.fulfilled, (state, action) => {
                state.comments = action.payload
            })
            .addCase(refreshComments.rejected, (state, action) => {
                handleErrorMessage(action, 'Cannot get comments')
            })

    }
})

export const { deleteCommentLocally } = CommentSlice.actions

export default CommentSlice.reducer