import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/Login';
import Genres from './components/Genres';
import Signup from './components/Signup';
import SearchResultsPage from './components/pages/SearchResultsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home", // Add this route
    element: <App />,
  },
  {
    path: "/login", // Ensure paths are consistent (use lowercase)
    element: <Login />,
  },
  {
    path: "/signup", // Ensure paths are consistent (use lowercase)
    element: <Signup />,
  },
  {
    path: "/genres", // Ensure paths are consistent (use lowercase)
    element: <Genres />,
  },
  {
    path: "/search/:query",
    element: <SearchResultsPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();