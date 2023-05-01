import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import NotFoundPage from "../pages/NotFoundPage";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<LoginPage/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    },
    {
      path:'/home',
      element:<HomePage/>
    },
    {
       path:'/Profile',
       element:<Profile/>
    },
    {
        path:"*",
        element:<NotFoundPage/>
    }
  
])