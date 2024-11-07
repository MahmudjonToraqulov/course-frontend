import { configureStore } from '@reduxjs/toolkit'

import  UsersSlice  from './slices/user.slice'
import  FormSlice  from './slices/form.slice'
import  FilledFormSlice  from './slices/filledForm.slice'
import  CommentSlice  from './slices/comment.slice'
import  AuthSlice  from './slices/auth.slice'
import JiraSlice  from './slices/jira.slice'

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        users: UsersSlice,
        forms: FormSlice,
        filledForms: FilledFormSlice,
        comments: CommentSlice,
        jira: JiraSlice,
    },
})