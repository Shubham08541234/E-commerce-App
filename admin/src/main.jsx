import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useOutletContext } from 'react-router'
import List from './pages/List.jsx'
import Add from './pages/Add.jsx'
import Orders from './pages/Orders.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<List />} />
      <Route path='add' element={<Add />} />
      <Route path='orders' element={<Orders />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
