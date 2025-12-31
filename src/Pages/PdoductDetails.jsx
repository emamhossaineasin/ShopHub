import axios from "axios";
import { RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addCart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);
  console.log(product);
  if (!product) return <div className="text-center mt-10">Loading...</div>;

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, i) => {
      const fillPercentage = Math.min(Math.max(rate - i, 0), 1) * 100;

      return (
        <div key={i} className="relative">
          <Star size={18} className="text-gray-300" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-wrap gap-8 p-8">
          {/* Left Side - Image */}
          <div className="flex-1 min-w-[300px] flex items-center justify-center bg-gray-50 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full h-auto object-contain max-h-96"
            />
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 min-w-[300px] flex flex-col justify-center space-y-6">
            <div>
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-4xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => addCart(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4 pt-6">
              <div className="flex items-start gap-3 text-sm">
                <Truck className="text-blue-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Shield className="text-blue-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">2 Year Warranty</p>
                  <p className="text-gray-600">Protected from defects</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <RotateCcw className="text-blue-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">30-Day Returns</p>
                  <p className="text-gray-600">Easy return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
