import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import Products from './components/Products.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import AddProduct from './components/AddProduct.jsx'
import EditProduct from './components/EditProduct.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:(
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    )
  },
  {
    path:"/products",
    element:(
      <ProtectedRoute>
        <Products/>
      </ProtectedRoute>
    )
  },
  {
    path:"/editProduct/:pid",
    element:(
      <ProtectedRoute>
        <EditProduct/>
      </ProtectedRoute>
    )
  },
  {
    path:"/addProduct",
    element:(
      <ProtectedRoute>
        <AddProduct/>
      </ProtectedRoute>
    )
  },
  {

    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
