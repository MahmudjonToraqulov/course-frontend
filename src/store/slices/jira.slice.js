import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { handleAsyncThunk, handleErrorMessage } from '../../utils'

const serverUrl = import.meta.env.VITE_REACT_APP_API_URL + "/jira"

export const getJiraTasks = createAsyncThunk('jira/getJiraTasks', async function (data, thunkApi){
    return await handleAsyncThunk(serverUrl+`/${data.email}`, 'get', {}, thunkApi, data?.handleIfSuccess)
})

export const refreshJiraTasks = createAsyncThunk('jira/refreshJiraTasks', async function (data, thunkApi){
    return await handleAsyncThunk(serverUrl+`/${data.email}`, 'get', {}, thunkApi, data?.handleIfSuccess)
})

export const createJiraTask = createAsyncThunk('jira/createJiraTask', async function (data, thunkApi){
    return await handleAsyncThunk(serverUrl, 'post', data.data, thunkApi, data?.handleIfSuccess)
})

const initialState = {
    tasks: [],
    loading: false,
}

export const JiraSlice = createSlice({
    name: 'comment',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getJiraTasks.pending, (state) => {
                state.loading = true
            })
            .addCase(getJiraTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
            })
            .addCase(getJiraTasks.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't get jira tasks")
            })
            .addCase(refreshJiraTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
            })
            .addCase(refreshJiraTasks.rejected, (state, action) => {
                handleErrorMessage(action, "Can't get jira tasks")
            })
            .addCase(createJiraTask.pending, (state) => {
                state.loading = true
            })
            .addCase(createJiraTask.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(createJiraTask.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't create jira task")
            })
    }
})

export default JiraSlice.reducer