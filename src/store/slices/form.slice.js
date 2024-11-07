import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {toast} from "react-toastify";

import {handleAsyncThunk,handleCreateEditAsyncThunk, handleErrorMessage} from "../../utils/index.js";

const serverUrl = import.meta.env.VITE_REACT_APP_API_URL + "/forms"
const selectedForm = {
    title: '',
    description: '',
    imageUrl: null,
    tags: [],
    formFields: [],
    topicId: 1,
}

export const getAllForms = createAsyncThunk('forms/getAllForms', async (formData, thunkApi)=>{
    return await handleAsyncThunk(serverUrl, 'get', formData, thunkApi)
})

export const getAllFormsBySearchWord = createAsyncThunk('forms/getAllFormsBySearchWord', async (searchWord, thunkApi)=>{
    return await handleAsyncThunk(serverUrl+`/bySearchWord?searchWord=${searchWord}`, 'get', {}, thunkApi)
})

export const getFormById = createAsyncThunk('forms/getFormById', async (data, thunkApi)=>{
    return await handleAsyncThunk(serverUrl+`/${data.id}`, 'get', {}, thunkApi, data?.handleNavigate)
})

export const getFormsByUserId = createAsyncThunk('forms/getFormsByUserId', async (userId, thunkApi)=>{
    return await handleAsyncThunk(serverUrl+`/user/${userId}`, 'get', {}, thunkApi)
})

export const refreshForm = createAsyncThunk('forms/refreshForm', async (id, thunkApi)=>{
    return await handleAsyncThunk(serverUrl`/${id}`, 'get', {}, thunkApi)
})

export const createForm = createAsyncThunk('forms/createForm', async (data, thunkApi)=>{
    return await handleCreateEditAsyncThunk(serverUrl+"/", 'post', data.formData, thunkApi, data.handleRedirect)
})

export const updateForm = createAsyncThunk('forms/updateForm', async (data, thunkApi)=>{
    return await handleCreateEditAsyncThunk(serverUrl+`/${data.id}`, 'put', data.formData, thunkApi, data.handleRedirect)
})

export const deleteForm = createAsyncThunk('forms/deleteForm', async (data, thunkApi)=>{
    return await handleAsyncThunk(serverUrl+`/${data.id}`, 'delete', {}, thunkApi, data.handleAfterSucess)
})
// tags
export const getTags = createAsyncThunk('forms/getTags', async (_, thunkApi)=>{
    const tagUrl = serverUrl.replace("forms", "tags")
    return await handleAsyncThunk(tagUrl, 'get', {}, thunkApi)
})
// topics
export const getTopics = createAsyncThunk('forms/getTopics', async (_, thunkApi)=>{
    const topicUrl = serverUrl.replace("forms", "topics")
    return await handleAsyncThunk(topicUrl, 'get', {}, thunkApi)
})

const initialState = {
    forms: [],
    selectedForm,
    selectedFormIndex: null,
    error: null,
    loading: false,
    tags: [],
    topics:[]
}

export const FormSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        setSelectedForm: (state, action) => {
            state.selectedForm = action.payload
        },
        resetForm:(state) => {
            state.selectedForm=selectedForm
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(getAllForms.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllForms.fulfilled, (state, action) => {
                state.loading = false
                state.forms = action.payload
            })
            .addCase(getAllForms.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't get forms")
            })

            .addCase(getAllFormsBySearchWord.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllFormsBySearchWord.fulfilled, (state, action) => {
                state.loading = false
                state.forms = action.payload
            })
            .addCase(getAllFormsBySearchWord.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't get forms")
            })

            .addCase(getFormById.pending, (state) => {
                state.loading = true
            })
            .addCase(getFormById.fulfilled, (state, action) => {
                state.loading = false
                state.selectedForm = action.payload
            })
            .addCase(getFormById.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't get form")
            })

            .addCase(getFormsByUserId.pending, (state) => {
                state.loading = true
            })
            .addCase(getFormsByUserId.fulfilled, (state, action) => {
                state.loading = false
                state.forms = action.payload
            })
            .addCase(getFormsByUserId.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't get forms")
            })

            .addCase(refreshForm.fulfilled, (state, action) => {
                state.selectedForm = action.payload
            })
            .addCase(refreshForm.rejected, (state, action) => {
                handleErrorMessage(action, "Can't refresh form")
            })



            .addCase(createForm.pending, (state) => {
                state.loading = true
            })
            .addCase(createForm.fulfilled, (state) => {
                state.loading = false
                toast.success('Form has been created')
            })
            .addCase(createForm.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't create form")
            })

            .addCase(updateForm.pending, (state) => {
                state.loading = true
            })
            .addCase(updateForm.fulfilled, (state) => {
                state.loading = false
                toast.success('Form has been edited')
            })
            .addCase(updateForm.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't edit form")
            })

            .addCase(deleteForm.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteForm.fulfilled, (state, ) => {
                state.loading = false
                toast.success('Form has been deleted')
            })
            .addCase(deleteForm.rejected, (state, action) => {
                state.loading = false
                handleErrorMessage(action, "Can't delete form")
            })

            .addCase(getTags.fulfilled, (state, action) => {
                state.tags = action.payload
            })

            .addCase(getTopics.fulfilled, (state, action) => {
                state.topics = action.payload
            })
    }
})

// Action creators are generated for each case reducer function
export const {
    setSelectedForm,
    resetForm
} = FormSlice.actions

export default FormSlice.reducer