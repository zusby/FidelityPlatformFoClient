import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './index.css'
import ErrorPage from './Pages/ErrorPage';
import HomePage from './HomePage';
import Layout from './Layout';
import ProductPage from './Pages/product';
import CategoryPage from './Pages/category';
import CartPage from './Pages/cart';



const router = createBrowserRouter([
  //HOME
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>),
    errorElement: <ErrorPage errorTitle='Page not found' errorMessage='The page you were looking for doesnt exist or got moved' />,

  },
  {
    path: "product/:productID",
    element: (
      <Layout>
        <ProductPage />
      </Layout>),
  },
  {
    path: "category/:categoryID",
    element: (
      <Layout>
        <CategoryPage />
      </Layout>),
  },
  {
    path: "cart",
    element: (
      <Layout>
        <CartPage />
      </Layout>),
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>,
)