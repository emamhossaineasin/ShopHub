import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/PdoductDetails";
import Products from "./Pages/Products";
import Success from "./Pages/Success";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> <Home />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Navbar /> <Products />
        </>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <>
          <Navbar /> <ProductDetails />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar /> <Cart />
        </>
      ),
    },
    {
      path: "/success",
      element: (
        <>
          <Navbar /> <Success />
        </>
      ),
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
