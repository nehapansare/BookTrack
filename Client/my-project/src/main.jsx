import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Views/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookShelf from './Component/BookShelf/BookShelf';
import Login from './Views/Login/Login';
import BookDetail from '../src/Component/BookDetail/BookDetail'; // Make sure this import is correct
import StudentDashboard from './Component/StudentDashboard/StudentDashboard';
import AdminDashboard from './Component/Admin/AdminDashboard/AdminDashboard';
import AdminEdit from './Component/Admin/AdminEdit/AdminEdit';
import AdminAdd from './Component/Admin/AdminAdd/AdminAdd';
import AdminStudent from './Component/Admin/AdminStudent/AdminStudent';

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
    path: "/book/:id", 
    element: <BookDetail />,
  },
  {
    path: "/studentdashboard", 
    element: <StudentDashboard />,
  },
  {
    path: "/admindashboard", 
    element: <AdminDashboard />,
  },
  {
    path: "/adminedit/:id",  
    element: <AdminEdit />,
  },
  {
    path: "/adminadd",  
    element: <AdminAdd/>,
  },
  {
    path: "/adminstudent",  
    element: <AdminStudent/>,
  }
  
]);

root.render(
  <RouterProvider router={router} />
);
