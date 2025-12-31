import { CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import Footer from "../components/Footer";

const Cart = () => {
  const {
    cart,
    invoice,
    removeFromCart,
    setInvoice,
    setCart,
    increaseQuantity,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const placeOrder = () => {
    setCart([]);
    setInvoice({ coount: 0, subTotal: 0 });
    navigate("/success");
  };
  return (
    <>
      <div className="flex justify-center">
        <div className=" w-full lg:w-[90%]">
          {cart.length > 0 ? (
            <div className="my-5">
              {cart.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="shadow-md p-4 flex items-center gap-4 w-full justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/products/${product.id}`}
                        className="cursor-pointer"
                      >
                        <div className="flex justify-center">
                          <img
                            alt={product.title}
                            src={product.image}
                            className="w-[120px] h-[120px] object-contain"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col gap-2 w-[450px]">
                        <p className="font-bold">{product.title}</p>
                        <p className="text-xs text-gray-500">
                          {product.description}
                        </p>
                        <div>
                          <p className="text-s">Price: {product.price}$ </p>
                          <p className="text-s">Qty: {product.quantity} </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">
                        {(product.price * product.quantity).toFixed(2)}$
                      </p>
                      <button onClick={() => increaseQuantity(product)}>
                        <CirclePlus
                          size={20}
                          className="text-green-600 cursor-pointer"
                        />
                      </button>
                      <button onClick={() => removeFromCart(product)}>
                        <CircleMinus
                          size={20}
                          className="text-red-600 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-col items-end gap-3 py-4 mr-3 lg:mr-0">
                <p className="font-bold">
                  Subtotal({invoice.count}{" "}
                  {invoice.count > 1 ? " items" : " item"}
                  ): {Number(invoice.subTotal).toFixed(2)}$
                </p>
                <button
                  className="bg-blue-600 text-s text-white p-2 w-[200px] rounded-md"
                  onClick={placeOrder}
                >
                  Place order
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center text-2xl justify-center p-4 gap-2 bg-amber-50 mt-10 mx-20 border rounded-xl">
              <span>Empty</span>
              <ShoppingCart className="text-2xl" />
              <Link className="text-blue-600" to={"/products"}>
                Add Products
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
