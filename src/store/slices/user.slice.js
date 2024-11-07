import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {handleAsyncThunk, handleErrorMessage} from "../../utils/index.js";

const serverUrl = import.meta.env.VITE_REACT_APP_API_URL + "/users"
const initialState = {
    users: [],
    error: null,
    loading: false,
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async function (id, thunkApi) {
    return await handleAsyncThunk(serverUrl, 'get', {}, thunkApi)
})

export const removeAdmin = createAsyncThunk('users/removeAdmin', async function (id, thunkApi) {
    thunkApi.dispatch(removeAdminLocally(id))
    return await handleAsyncThunk(serverUrl + `/removeAdmin/${id}`, 'put', {}, thunkApi)
})

export const addAdmin = createAsyncThunk('users/addAdmin', async function (id, thunkApi) {
    thunkApi.dispatch(setAdminLocally(id))
    return await handleAsyncThunk(serverUrl + `/setAdmin/${id}`, 'put', {}, thunkApi)
})

export const blockUser = createAsyncThunk('users/blockUser', async function (id, thunkApi){
    thunkApi.dispatch(blockUserLocally(id))
    return await handleAsyncThunk(serverUrl + `/blockUser/${id}`, 'put', {}, thunkApi)
})

export const unblockUser = createAsyncThunk('users/unblockUser', async function (id, thunkApi){
    thunkApi.dispatch(unblockUserLocally(id))
    return await handleAsyncThunk(serverUrl + `/unblockUser/${id}`, 'put', {}, thunkApi)
})

export const deleteUser = createAsyncThunk('users/deleteUser', async function (id, thunkApi){
    thunkApi.dispatch(deleteUserLocally(id))
    return await handleAsyncThunk(serverUrl + `/deleteUser/${id}`, 'delete', {}, thunkApi)
})

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        removeAdminLocally: (state, action) => {
            state.users = state.users.map(user => user.id === action.payload ? {...user, role: 'user'} : user)
        },
        setAdminLocally: (state, action) => {
            state.users = state.users.map(user => user.id === action.payload ? {...user, role: 'admin'} : user)
        },
        selfDeleteFromUsers: (state, action)=>{
            state.users = state.users.filter(user => user.id!== action.payload)
        },
        blockUserLocally: (state, action) => {
            state.users = state.users.map(user => user.id === action.payload? {...user, blocked: true} : user)
        },
        unblockUserLocally: (state, action) => {
            state.users = state.users.map(user => user.id === action.payload? {...user, blocked: false} : user)
        },
        deleteUserLocally:(state, action)=>{
            state.users = state.users.filter(user => user.id!== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.error = false
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.loading = false
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.loading = false
                state.error = true
                handleErrorMessage(state.error, "Cannot fetch users")
            })

            .addCase(removeAdmin.rejected, (state) => {
                handleErrorMessage(state.error, "Cannot remove from admin")
            })

            .addCase(addAdmin.rejected, (state) => {
                handleErrorMessage(state.error, "Cannot set as admin")
            })

            .addCase(blockUser.rejected, (state) => {
                handleErrorMessage(state.error, "Cannot block user")
            })

            .addCase(unblockUser.rejected, (state) => {
                handleErrorMessage(state.error, "Cannot unblock admin")
            })

            .addCase(deleteUser.rejected, (state) => {
                handleErrorMessage(state.error, "Cannot delete admin")
            })
    }
})

export const {
    removeAdminLocally,
    setAdminLocally,
    selfDeleteFromUsers,
    blockUserLocally,
    unblockUserLocally,
    deleteUserLocally
} = UsersSlice.actions

export default UsersSlice.reducer