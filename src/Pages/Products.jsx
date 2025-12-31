import { ShoppingCart, Star } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { ProductContext } from "../Context/ProductContext";
import Footer from "../components/Footer";

const Products = () => {
  const { products, categories, addCart } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState("All products");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProducts = () => {
    let updated = [...products];

    if (selectedCategory !== "All products") {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "Price: Low to High") {
      updated.sort((a, b) => a.price - b.price);
    }
    if (sortOption === "Price: High to Low") {
      updated.sort((a, b) => b.price - a.price);
    }
    if (sortOption === "Name: A to Z") {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortOption === "Name: Z to A") {
      updated.sort((a, b) => b.title.localeCompare(a.title));
    }

    return updated;
  };

  return (
    <div className="bg-white">
      <div className="mt-5">
        <div className="flex flex-wrap gap-6 justify-between mx-5 lg:mx-30">
          <div>
            <p className="text-m text-gray-700">Filter by category</p>
            <Combobox
              data={["All products", ...categories]}
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
            />
          </div>

          <div>
            <p className="text-m text-gray-700">Sort</p>
            <Combobox
              data={[
                "Price: Low to High",
                "Price: High to Low",
                "Name: A to Z",
                "Name: Z to A",
              ]}
              value={sortOption}
              onChange={(value) => setSortOption(value)}
              placeholder="Select sort option"
            />
          </div>

          <div>
            <p className="text-m text-gray-700">Search</p>
            <Combobox
              hideCaret
              hideEmptyPopup
              data={[]}
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              placeholder="Search for a product"
            />
          </div>
        </div>

        <div className="w-full min-h-screen gap-6 flex-wrap flex justify-center items-center mt-5">
          {filteredProducts().map((product) => (
            <div
              key={product.id}
              className="h-110 w-80 p-2 bg-gray-100 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
            >
              <Link to={`/products/${product.id}`} className="cursor-pointer">
                <div className="flex justify-center">
                  <img
                    alt={product.title}
                    src={product.image}
                    className="h-60 object-cover rounded-xl"
                  />
                </div>
              </Link>

              <div className="flex flex-col justify-between">
                <div className="p-2">
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
                    className="w-full px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex justify-between"
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
      <Footer />
    </div>
  );
};

export default Products;
