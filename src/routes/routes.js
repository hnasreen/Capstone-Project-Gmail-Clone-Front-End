import { lazy } from 'react';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home'



const Main = lazy(()=> import ('../pages/Main'));
const Emails = lazy(()=> import ('../components/Emails'));
const ViewEmail = lazy(()=> import ('../components/ViewEmail'));

const routes = {
  main:{
    path:'/',
    element: Main
  },
  home:{
    path:'/home',
    element: Home
  },
  emails:{
    path: '/emails',
    element : Emails
  },
  view: {
    path:'/view',
    element : ViewEmail
  },
  invalid: {
    path: '/*',
    element : Emails
  },
  register:{
    path: '/register',
    element : Register
  },
  login:{
    path:'/login',
    element: Login
  },
  forgotpassword:{
    path:'/forgot-password',
    element: ForgotPassword
  },
  resetpassword:{
    path:'/reset-password/:id/:token',
    element: ResetPassword
  }

}

export {routes}

