import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const ProductContext = createContext([]);
const cartFromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [invoice, setInvoice] = useState({ count: 0, subTotal: 0 });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (product) => {
    setCart((oldCart) => {
      let previous = [...oldCart];
      if (previous.length < 1) {
        previous.push({ ...product, quantity: 1 });
      } else {
        const isProduct = previous.find((prod) => prod.id === product.id);
        if (!isProduct) {
          previous.push({ ...product, quantity: 1 });
        } else {
          previous = previous.map((prod) => {
            return prod.id === isProduct.id
              ? { ...isProduct, quantity: isProduct.quantity + 1 }
              : prod;
          });
        }
      }
      console.log("Product added successfully");
      toast.success("Product added successfully", {
        style: { background: "green", color: "white" },
      });
      return previous;
    });
  };
  const removeFromCart = (product) => {
    setCart((oldCart) => {
      let previous = [...oldCart];

      const isProduct = previous.find((prod) => prod.id === product.id);

      if (isProduct) {
        if (isProduct.quantity > 1) {
          previous = previous.map((prod) =>
            prod.id === isProduct.id
              ? { ...prod, quantity: prod.quantity - 1 }
              : prod
          );
        } else {
          previous = previous.filter((prod) => prod.id !== product.id);
        }
      }

      return previous;
    });
  };
  const increaseQuantity = (product) => {
    setCart((oldCart) => {
      let previous = [...oldCart];

      const isProduct = previous.find((prod) => prod.id === product.id);

      if (isProduct) {
        previous = previous.map((prod) =>
          prod.id === isProduct.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
      } else {
        // If product is not in cart, add it with quantity 1
        previous.push({ ...product, quantity: 1 });
      }

      return previous;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
        console.log(categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const setInvoiceData = () => {
      setInvoice((previous) => {
        let newInvoice = { ...previous, count: 0, subTotal: 0 };
        cart.forEach((product) => {
          newInvoice.count++;
          newInvoice.subTotal += product.quantity * product.price;
        });
        return newInvoice;
      });
    };
    setInvoiceData();
  }, [cart]);
  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addCart,
        invoice,
        setInvoice,
        cart,
        setCart,
        removeFromCart,
        increaseQuantity,
      }}
    >
      {/* {JSON.stringify(invoice)} */}
      {children}
    </ProductContext.Provider>
  );
};
