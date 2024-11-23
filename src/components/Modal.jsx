import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Importing framer-motion for animation effects

const Modal = ({ isOpen, onClose, onSubmit, userFirstName }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    setName(userFirstName || "");
  }, [userFirstName]);

  // If modal is not open, return null to hide it
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gradient-to-r from-[#7F9055] to-[#A2B57F] p-8 rounded-lg w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">Резервирай маса</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, date, time, guests });
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Име"
            value={name}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A2B57F]"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A2B57F]"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A2B57F]"
          />
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A2B57F]"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A2B57F]"
            >
              Отказ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#A2B57F] text-white rounded-lg hover:bg-[#7F9055] focus:outline-none focus:ring-2 focus:ring-[#A2B57F]"
            >
              Запази
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
