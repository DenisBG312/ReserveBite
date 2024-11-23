// src/pages/Restaurants.jsx

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firestore methods
import RestaurantCard from "../components/RestaurantCard"; // Import RestaurantCard component
import { Link } from "react-router-dom"; // Link for routing

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // State to store restaurant data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const db = getFirestore();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetch restaurant data from Firestore
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        
        const restaurantData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(), // Spread restaurant data
          };
        });

        setRestaurants(restaurantData); // Update the state
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRestaurants();
  }, [db]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message if still fetching
  }

  return (
    <div className="restaurants-page bg-[#F9F9F9] py-8 px-4">
      <h2 className="text-3xl font-bold text-[#7F9055] text-center mb-8">Нашите Ресторанти</h2>
      
      <div className="restaurant-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
