import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import ProductHome from "../components/ProductHome";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Banner />
      <ProductHome />
      <div className="text-center">
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 inline-flex items-center cursor-pointer"
        >
          See all products
        </button>
      </div>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
