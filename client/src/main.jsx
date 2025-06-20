import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

import Login from './layouts/Login/Login.jsx'
import Registration from './layouts/Registration/Registration.jsx'
import MainPage from './layouts/MainPage/MainPage.jsx'

import './style.css'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/main',
    element: <MainPage /> 
  },
  {
    path: '/register',
    element: <Registration />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

