import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Category from './Routes/Category/index.jsx'
import Error404 from './Routes/Error/Error404.jsx'
import Questions from './Routes/Questions/index.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Category />,
    errorElement: <Error404 />
  },
  {
    path: '/questions/:category',
    element: <Questions />,
  }
  ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
