import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Views/Home/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookShelf from './Component/BookShelf/BookShelf';
import Login from './Views/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path:"/bookshelf",
    element:<BookShelf/>
  },
  {
    path:"/login",
    element:<Login/>
  }
  
  
]);

root.render(
  <RouterProvider router={router} />
);
