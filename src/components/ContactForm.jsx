import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleFormSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <div id="contact" className="bg-gray-100 py-10 mt-5">
      <div className="max-w-full xl:max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="w-[350px] space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Mail className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@shophub.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Phone className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+880 1715-112233</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <MapPin className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600">123 Shopping Street, Dhaka 1219</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-5">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your message..."
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleFormSubmit}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 inline-flex items-center cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
