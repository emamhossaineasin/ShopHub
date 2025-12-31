const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4">Store</h3>
          <p className="text-gray-400">
            Your one-stop shop for the latest products.
          </p>
        </div>
        <div className="mb-10">
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">
              Electronics
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Accessories
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Dress
            </li>
          </ul>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
