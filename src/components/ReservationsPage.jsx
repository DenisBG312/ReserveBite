import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { motion } from "framer-motion"; // For animations

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [restaurantData, setRestaurantData] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const reservationsRef = collection(db, "users", user.uid, "reservations");
          const reservationsSnapshot = await getDocs(reservationsRef);

          const reservationsList = reservationsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReservations(reservationsList);

          const fetchedRestaurantData = {};
          for (const reservation of reservationsList) {
            const restaurantId = reservation.restaurantId;
            if (restaurantId && !fetchedRestaurantData[restaurantId]) {
              const restaurantDoc = await getDoc(doc(db, "restaurants", restaurantId));
              if (restaurantDoc.exists()) {
                fetchedRestaurantData[restaurantId] = restaurantDoc.data();
              }
            }
          }
          setRestaurantData(fetchedRestaurantData);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [auth]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#7F9055] text-center mb-10">
        Вашите Резервации
      </h1>
      {reservations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg text-gray-600"
        >
          <p>Няма намерени резервации.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.4, staggerChildren: 0.1 } },
          }}
        >
          {reservations.map((reservation) => {
            const restaurantInfo = restaurantData[reservation.restaurantId] || {};
            return (
              <motion.div
                key={reservation.id}
                className="bg-gradient-to-r from-[#7F9055] to-[#A2B57F] p-6 rounded-lg shadow-xl transform transition hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {restaurantInfo.name || "Unknown Restaurant"}
                </h2>
                <p className="text-sm text-gray-200 italic mb-4">
                  {restaurantInfo.address || ""}
                </p>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">
                    <strong>Дата:</strong> {reservation.date}
                  </p>
                  <p className="text-gray-800">
                    <strong>Час:</strong> {reservation.time}
                  </p>
                  <p className="text-gray-800">
                    <strong>Брой гости:</strong> {reservation.guests}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default ReservationsPage;
