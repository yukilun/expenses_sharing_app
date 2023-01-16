import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import Expenses from './components/Expenses';

/** auth middleware */
import { AuthorizeUser, ProtectRoute, RedirectLoginUser } from './middleware/auth';

/** root routes */
const router = createBrowserRouter([
    {
        path: '/',
        element: <RedirectLoginUser><Username /></RedirectLoginUser>
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                path: '',
                element: <Username />
            },
            {
                path: 'add-expense',
                element: <Register />
            },
            {
                path: 'expenses',
                element: <Expenses />
            },
            {
                path: 'members',
                element: <Register />
            },
            {
                path: 'profile',
                element: <Profile />  
            }
        ]
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <ProtectRoute><Recovery /></ProtectRoute>
    },
    {
        path: '/reset',
        element: <ProtectRoute><Reset /></ProtectRoute>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    }
    
]);

export default function App() {
  return (
    <main>
        <RouterProvider router={router} />
    </main>
  )
}
