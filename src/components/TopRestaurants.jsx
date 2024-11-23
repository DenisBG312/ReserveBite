import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { LoadingDots } from "./LoadingDots";

const TopRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        const restaurantList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(restaurantList);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div
      className="relative my-12 px-6 py-12 bg-gradient-to-br from-gray-100 via-orange-100 to-orange-200"
      style={{
        backgroundImage: `url('/path-to-texture.png')`,
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Heading */}
      <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-10 relative">
        Топ ресторанти в Русе
        <span className="absolute left-1/2 transform -translate-x-1/2 top-14 w-40 h-1 bg-orange-500 rounded-full"></span>
      </h2>

      {/* Restaurants Grid */}
      {restaurants.length === 0 ? (
        // If no restaurants are found, show a message
        <div className="flex justify-center items-center text-xl text-gray-700">
          Няма намерени ресторанти
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
        >
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RestaurantCard restaurant={restaurant} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TopRestaurants;
