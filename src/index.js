import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter
} from "react-router-dom";

import Login from './components/Login';
import Genres from './components/Genres';
import Signup from './components/Signup';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/home", // Add this route
    element: <App />,
  },
  {
    path: "Login",
    element: <Login/>,
  },
  {
    path: "Signup",
    element: <Signup/>,
  },
  {
    path: "Genres",
    element: <Genres/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
