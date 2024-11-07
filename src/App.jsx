import {useEffect} from "react";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { ToastContainer } from 'react-toastify';

import {getTagsAndTopics} from "./utils/index.js";
import {setLocallySavedUser} from "./utils/index.js";

import './styles/index.css'

import Home from "./components/home/Home.jsx";
import AdminPage from "./components/admin/index.jsx";
import Header from "./components/navbar/index.jsx";
import ErrorPage from "./components/error/index.jsx";
import HandleUsersAdmin from "./components/handle-users-admin/index.jsx";
import Login from "./components/login/index.jsx";
import Register from "./components/register/index.jsx";
import Forms from "./components/forms/index.jsx";
import CreateForm from "./components/create-form/index.jsx";
import FormPage from "./components/form-page/index.jsx";
import UserPage from "./components/user-page/index.jsx";
import FormTemplates from "./components/form-templates";
import EditForm from "./components/edit-form/index.jsx";
import HandleFormsAdmin from "./components/handle-forms-admin";
import FillForm from "./components/fill-form/index.jsx";
import EditFillForm from "./components/edit-fill-form";
import HandleFilledFormsAdmin from "./components/handle-filled-forms-admin";
import FilledFormPage from "./components/filled-form-page/index.jsx";
import HandleCommentsAdmin from "./components/handle-comments-admin";
import JiraPage from "./components/Jira/index.jsx";
import GenerateToken from "./components/odoo-token-generator/index.jsx";



const protectedRoutes = (userRole)=>(
    <Route path="/" element={<Header />}>
        <Route path="/my-page" element={<UserPage/>}/>
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/edit-form" element={<EditForm/>}/>
        <Route path="/form-templates" element={<FormTemplates />} />
        <Route path="/fill-form/:id" element={<FillForm />} />
        <Route path="/edit-filled-form" element={<EditFillForm />} />                   
        <Route path="/filled-form-page" element={<FilledFormPage/>} />                   
        <Route path="/jira" element={<JiraPage />} />                   
        <Route path="/token" element={<GenerateToken />} />                   
        {userRole==='admin' && 
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<HandleUsersAdmin />} />
            <Route path="/admin/manage-forms" element={<HandleFormsAdmin/>} />
            <Route path="/admin/manage-filled-forms" element={<HandleFilledFormsAdmin/>} />
            <Route path="/admin/manage-comments" element={<HandleCommentsAdmin/>} />
          </>
        }
        <Route index element={<Home />} />
        <Route path='/forms' element={<Forms/>}/>
        <Route path='/forms/:id' element={<FormPage/>}/>
        <Route path="*" element={<ErrorPage />} />
    </Route>
);

const unProtectedRoutes =()=> (
        <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path='/forms' element={<Forms/>}/>
            <Route path='/forms/:id' element={<FormPage/>}/>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Route>
);

function App() {

    const dispatch = useDispatch()

    useSelector(state => console.log('state -> ', state));
    const user = useSelector(state => state.auth.user);

    const router = createBrowserRouter(
        createRoutesFromElements(user ? protectedRoutes(user?.role) : unProtectedRoutes())
    );

    useEffect(() => {
        getTagsAndTopics(dispatch)
        setLocallySavedUser(dispatch)
    }, []);

    return (
        <div className='App' >
            <RouterProvider
                router={router} />
            <ToastContainer />
        </div>
    );
}

export default App;