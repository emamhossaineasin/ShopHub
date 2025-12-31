import { ShoppingCart, Star } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
const ProductHome = () => {
  const { products, addCart } = useContext(ProductContext);

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, i) => {
      const fillPercentage = Math.min(Math.max(rate - i, 0), 1) * 100;

      return (
        <div key={i} className="relative">
          <Star size={15} className="text-gray-300" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <Star size={15} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bg-white ">
      <div className="w-full pt-8 gap-6 flex-wrap flex justify-center items-center ">
        {products.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="h-115 w-55 p-2 bg-gray-100 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
          >
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="cursor-pointer"
            >
              <div className="flex justify-center">
                <img
                  alt={product.imageAlt}
                  src={product.image}
                  className="h-60 object-cover rounded-xl "
                />
              </div>
            </Link>
            <div className="flex flex-col justify-between">
              <div className="p-2 ">
                <h2 className="mb-2">{product.title}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
                <span className="text-xl font-semibold">
                  {product.price + "$"}
                </span>
              </div>
              <div>
                <button
                  onClick={() => addCart(product)}
                  className="w-full px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer text-white flex justify-between "
                >
                  <p className="text-xl">Add to Cart</p>
                  <ShoppingCart size={30} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHome;
