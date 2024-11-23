import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const { imageUrl, name, address, description, id } = restaurant;

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
      whileHover={{ scale: 1.03 }}
    >
      {/* Restaurant Image */}
      <div className="relative">
        <img
          src={imageUrl || "/default-image.jpg"}
          alt={name}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 rounded-t-xl"></div>
      </div>

      {/* Restaurant Details */}
      <div className="p-6 bg-[#F5EFED]">
        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>

        {/* Address */}
        <p className="text-sm text-gray-600 mb-2">
          <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>
          {address}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 truncate">
          {description || "Няма налично описание."}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center">


          {/* Reserve Button */}
          <Link
            to={`/restaurant/${id}/`} // Route for reservation modal
            className="px-4 py-2 bg-gradient-to-r justify-centre from-orange-400 to-orange-600 text-white rounded-lg shadow hover:from-orange-500 hover:to-orange-700 focus:ring-2 focus:ring-orange-300"
          >
            Резервирай
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
