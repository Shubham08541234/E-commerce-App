import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import {About, Cart, Collection, Contact, Home, Login, Orders, PlaceOrder, Product} from './pages/index.js';
import ShopContextProvider from './context/ShopContextProvider.jsx';


const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
      // children: [
      //   {
      //     path: '/home',
      //     element: <Home/>
      //   }
      // ]
    },
    {
      path: '/home',
      element: <Home/>
    }
  ]
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* renders inside <Outlet /> */}
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="collection" element={<Collection />} />
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='product/:productId' element={<Product/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='place-order' element={<PlaceOrder/>}/>
      <Route path='orders' element={<Orders/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
  </ShopContextProvider>
)
