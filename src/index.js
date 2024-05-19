import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import App from './App';
import {clientID} from "./utils/constants";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Admin from "./components/Admin";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/admin',
        element: <Admin/>
    }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={clientID}>
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
);
