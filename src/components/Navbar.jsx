import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { useContext } from "react";

const Navbar = () => {
  const { invoice } = useContext(ProductContext);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 flex flex-row justify-between p-3">
      <div>
        <Link to="/" className="text-xl md:text-3xl font-bold text-indigo-600 ">
          ShopHub
        </Link>
      </div>

      <div className="flex flex-row space-x-3">
        <Link to="/" className="text-lg md:text-2xl font-bold text-indigo-600">
          Home
        </Link>
        <Link
          to="/products"
          className="text-lg md:text-2xl font-bold text-indigo-600"
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="text-lg md:text-2xl font-bold text-indigo-600 relative"
        >
          <ShoppingCart size={30} />
          {invoice?.count > 0 && (
            <div
              className="absolute -top-2 -right-2 w-4 h-4 text-xs bg-black text-white flex items-center
          justify-center rounded-full"
            >
              {invoice?.count}
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
