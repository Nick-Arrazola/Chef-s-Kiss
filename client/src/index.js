import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Intro from './pages/intro'; // Import your Intro page component
import LoginPage from './pages/login';
import ErrorPage from './pages/error';
import Home from './pages/home';
import Profile from './pages/profile';
import Settings from './pages/settings/index';
import Collection from './pages/collection';
import Post from './pages/post';
import View from './pages/view';
import SignUp from './pages/signup';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const baseURL = process.env.PUBLIC_URL;
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // This is the Intro page, set as the default page
      {
        index: true,
        element: <Intro />,
      },
      // The Login page
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'collection',
        element: <Collection />,
      },
      {
        path: 'recipe-post',
        element: <Post />,
      },
      {
        path: 'view-recipe/:id',
        element: <View />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

