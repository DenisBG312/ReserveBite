import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import dish1 from "../assets/dish1.png";
import dish3 from "../assets/dish3.png";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [restaurants, setRestaurants] = useState([]); // State to store all restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State to store filtered results
  const [isSearchClicked, setIsSearchClicked] = useState(false); // State to track search button click

  useEffect(() => {
    // Fetch restaurants from Firestore
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(db, "restaurants");
        const snapshot = await getDocs(restaurantsCollection);
        const fetchedRestaurants = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(fetchedRestaurants);
        setFilteredRestaurants(fetchedRestaurants); // Initialize with all restaurants
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearch = () => {
    // Filter restaurants based on the search query
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
    setIsSearchClicked(true); // Set flag to show the results after search button click
  };

  const handleKeyDown = (e) => {
    // Trigger search on pressing "Enter"
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="relative px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden min-h-[75vh]"
      style={{
        background: `linear-gradient(to bottom, #f9f9f9, #e8f5e9)`,
      }}
    >
      {/* Background Lines */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(127, 144, 85, 0.1) 0,
            rgba(127, 144, 85, 0.1) 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      {/* Left Dish Image */}
      <motion.div
        className="absolute z-10 top-20 sm:top-24 md:top-28 lg:top-32 left-6 sm:left-8 md:left-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-green-500 shadow-xl flex items-center justify-center bg-white"
          whileHover={{ scale: 1.1, rotate: 8 }}
        >
          <img src={dish1} alt="Dish 1" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      {/* Right Dish Images */}
      <motion.div
        className="absolute z-10 right-6 sm:right-8 md:right-10 space-y-6 sm:space-y-8"
        style={{
          bottom: "calc(3rem + 4vw)", // Adjust bottom space dynamically
        }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl flex items-center justify-center bg-white"
          whileHover={{ scale: 1.1, rotate: 8 }}
        >
          <img src={dish3} alt="Dish 3" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      {/* Center Content */}
      <motion.div
        className="relative z-20 text-center max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2"
          style={{
            color: "#7F9055",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Oткрийте, резервирайте, насладете се!
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-1 sm:mb-2">
          Независимо дали планирате специална вечер или искате просто да се
          насладите на вкусно ястие, ReserveBite прави процеса на резервация
          бърз и удобен.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-2">
          <motion.input
            type="text"
            className="w-full max-w-lg px-6 py-3 border border-[#7F9055] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7F9055]"
            placeholder="Търсете ресторант..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Trigger search on "Enter"
            whileFocus={{ borderColor: "#7F9055" }}
          />
          <motion.button
            className="px-6 sm:px-8 py-3 bg-[#7F9055] text-white rounded-full hover:bg-[#6B7C4A]"
            whileHover={{ scale: 1.05 }}
            onClick={handleSearch} // Trigger the search
          >
            Търси сега
          </motion.button>
        </div>

        {/* Search Results */}
        {isSearchClicked && filteredRestaurants.length > 0 && (
          <div
            className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg z-[99]" // Ensure z-index is high enough
            style={{
              top: "calc(100% + 1rem)", // Directly below the search input
              maxHeight: "300px", // Limits height to prevent large result lists from overflowing
              overflowY: "auto", // Ensures scrolling if the list is too long
            }}
          >
            <ul>
              {filteredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`} // This will route to the restaurant detail page
                >
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-[#7F9055] hover:text-white transition duration-200"
                  >
                    {restaurant.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchSection;
