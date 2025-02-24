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
import { UserProvider } from './UserContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
const baseURL = process.env.PUBLIC_URL;
const router = createBrowserRouter([
  {
    // This is the only path element in the array, making '/' the root path of the website.
    path: '/',
    // Specifying "App" component (from App.js) to be rendered when user hits the root path, AKA, '/' on Chef's Kiss.
    element: <App />,
    errorElement: <ErrorPage />,
    // Listing all of the child paths of root, AKA, all of the possible pages a user will be able to go to in "Chef's Kiss".
    // Since all of these paths are children of "App", they will all be rendered in where "<Outlet>" is, which is "App.js".
    children: [
      // "Intro" page. Set as the default page where user goes to once site first loads, user hits the "/" route, "App" component is rendered, then <Outlet> is reached.
      // <Outlet> will render the "<Intro>" component because user did not specify any child route, only specified '/'.
      {
        // Making "Intro" page the "index" route. 
        // "index" = default component that is rendered when user reaches "/"; the root path (App)
        index: true,
        element: <Intro />,
      },
      // "Login" page
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
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();