import { LogOut, ShoppingCart, User } from "lucide-react";
import { useContext, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "../Context/ProductContext";

// Helper to subscribe to localStorage changes
const subscribeToStorage = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

// Return raw string to avoid creating new object on each call
const getUserSnapshot = () => {
  return localStorage.getItem("currentUser");
};

const Navbar = () => {
  const { invoice } = useContext(ProductContext);
  const navigate = useNavigate();
  const userString = useSyncExternalStore(subscribeToStorage, getUserSnapshot);
  const currentUser = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    // Dispatch storage event to trigger useSyncExternalStore update
    window.dispatchEvent(new Event("storage"));
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 flex flex-row justify-between p-3">
      <div>
        <Link to="/" className="text-xl md:text-3xl font-bold text-indigo-600 ">
          ShopHub
        </Link>
      </div>

      <div className="flex flex-row space-x-3 items-center">
        <Link
          to="/"
          className="text-lg md:text-2xl font-medium text-indigo-600"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-lg md:text-2xl font-medium text-indigo-600"
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="text-lg md:text-2xl font-medium text-indigo-600 relative"
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

        {currentUser ? (
          <div className="flex items-center space-x-2">
            <span className="text-lg md:text-2xl font-medium text-gray-700 flex items-center gap-1">
              <User size={30} />
              <span className="hidden md:inline">{currentUser.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              title="Logout"
            >
              <LogOut size={30} />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="text-lg md:text-2xl font-medium text-indigo-600 hover:text-indigo-800"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-lg md:text-2xl font-medium bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
