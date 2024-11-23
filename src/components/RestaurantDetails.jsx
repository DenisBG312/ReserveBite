import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Modal from "./Modal";
import { motion } from "framer-motion"; // For animations

const RestaurantDetails = () => {
  const { id } = useParams(); // Restaurant ID
  const [restaurant, setRestaurant] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("chips"); // Default category is 'chips'

  // Sample menu data with categories
  const menu = {
    chips: [
      { name: "Classic Chips", price: "5 лв." },
      { name: "Cheese Fries", price: "7 лв." },
    ],
    burgers: [
      { name: "Cheeseburger", price: "12 лв." },
      { name: "BBQ Burger", price: "15 лв." },
    ],
    salads: [
      { name: "Caesar Salad", price: "10 лв." },
      { name: "Greek Salad", price: "9 лв." },
    ],
    desserts: [
      { name: "Chocolate Cake", price: "6 лв." },
      { name: "Ice Cream", price: "4 лв." },
    ],
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const docRef = doc(db, "restaurants", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRestaurant(docSnap.data());
        } else {
          console.log("No such restaurant!");
        }
      } catch (error) {
        console.error("Error fetching restaurant: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  useEffect(() => {
    const fetchUserFirstName = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          if (user.displayName) {
            setUserFirstName(user.displayName.split(" ")[0]);
          } else {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUserFirstName(userData.firstName || "User");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setUserFirstName("User");
      }
    };

    fetchUserFirstName();
  }, []);

  const handleReservationSubmit = async (reservationData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userReservationsRef = collection(
          doc(db, "users", user.uid),
          "reservations"
        );

        const reservationWithRestaurant = {
          ...reservationData,
          restaurantId: id,
          timestamp: new Date().toISOString(),
        };

        await addDoc(userReservationsRef, reservationWithRestaurant);

        alert("Reservation successfully saved!");
      } else {
        alert("You need to be logged in to make a reservation.");
      }
    } catch (error) {
      console.error("Error saving reservation: ", error);
      alert("Failed to save reservation. Please try again.");
    } finally {
      setModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5EFED]">
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{
            border: "5px solid #7F9055",
            borderTop: "5px solid transparent",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
        ></motion.div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="text-center py-10 text-2xl">Restaurant not found!</div>;
  }

  // Function to display menu items for the selected category
  const renderMenuItems = () => {
    return menu[selectedCategory].map((item, index) => (
      <li key={index} className="flex justify-between py-2">
        <span>{item.name}</span>
        <span>{item.price}</span>
      </li>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section with Background Image and Black Overlay */}
      <div className="relative">
        <img
          src={restaurant.imageUrl || "/default-image.jpg"}
          alt={restaurant.name}
          className="w-full h-80 object-cover rounded-lg shadow-lg opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <motion.h1
            className="text-5xl font-extrabold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {restaurant.name}
          </motion.h1>
          <motion.p
            className="text-xl mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {restaurant.address}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mt-10">
        {/* Left Column - Restaurant Description and Buttons with Enhancements */}
        <div className="flex flex-col w-full lg:w-1/2 space-y-6 bg-gradient-to-r from-[#f8f9fa] to-[#e2e3e5] rounded-lg p-8 shadow-xl">
          <motion.h2
            className="text-3xl font-bold text-[#7F9055] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {restaurant.name}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {restaurant.description}
          </motion.p>

          <div className="flex space-x-4 mb-8">
            <motion.button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-[#7F9055] to-[#A2B57F] text-white font-semibold rounded-lg shadow-md hover:bg-[#A2B57F] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Резервирай
            </motion.button>
          </div>

          <div className="space-y-6">
            <motion.div
              className="bg-[#F5EFED] p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-[#7F9055] flex items-center">
                <span className="mr-2">⏰</span> Часове на работа: <br/>Понеделник - Петък: 10:00 - 22:00 <br />Събота - Неделя: 12:00 - 23:00
              </h3>
              <p className="text-gray-700">{restaurant.workingHours}</p>
            </motion.div>

            <motion.div
              className="bg-[#F5EFED] p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-[#7F9055] flex items-center">
                <span className="mr-2">⭐</span> Рейтинг: ⭐⭐⭐⭐⭐
              </h3>
              <div className="space-y-4">
                {restaurant.reviews?.map((review, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <p className="text-gray-700 font-semibold">{review.user}</p>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Restaurant Menu with Categories */}
        <div className="lg:w-1/2 space-y-6">
          <motion.div
            className="bg-[#F5EFED] p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-[#7F9055] mb-1">Меню:</h3>
            <div className="flex space-x-4 mb-6">
              {Object.keys(menu).map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 font-semibold rounded-lg ${
                    selectedCategory === category
                      ? "bg-[#7F9055] text-white"
                      : "bg-transparent text-[#7F9055] border-2 border-[#7F9055]"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <ul className="space-y-4 text-gray-700">{renderMenuItems()}</ul>
          </motion.div>
        </div>
      </div>

      {/* Modal for Reservation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReservationSubmit}
        userFirstName={userFirstName}
      />
    </div>
  );
};

export default RestaurantDetails;
