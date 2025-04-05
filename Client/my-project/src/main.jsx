import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Views/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookShelf from './Component/BookShelf/BookShelf';
import Login from './Views/Login/Login';
import BookDetail from '../src/Component/BookDetail/BookDetail'; // Make sure this import is correct
import StudentDashboard from './Component/StudentDashboard/StudentDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bookshelf",
    element: <BookShelf />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:id", // New route for book details
    element: <BookDetail />,
  },
  {
    path: "/studentdashboard", // New route for book details
    element: <StudentDashboard />,
  },

]);

root.render(
  <RouterProvider router={router} />
);
