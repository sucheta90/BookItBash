import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        // element: <Homepage/>
      },
      {
        path: '/Profile',
        // element: <Profile />
      },
      {
        path: '/Login',
        // element: <Login />
      },
      {
        path: '/Signup',
        // element: <Signup />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router}/>
    </NextUIProvider>
  </React.StrictMode>,
)
