import React from "react";
import { FaCalendarAlt, FaUtensils, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const BenefitsSection = () => {
  return (
    <div className="bg-[#F9F9F9] py-12 px-6 sm:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Ползи от ползването на сайта ReserveBite
        </h2>
        <p className="text-lg text-gray-600">
          Открийте как можем да улесним вашето преживяване в ресторантите.
        </p>
      </div>

      {/* Benefits Grid Section */}
      <div className="flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-20">
        {/* Benefit 1 */}
        <motion.div
          className="flex flex-col items-center text-center max-w-xs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="bg-[#7F9055] p-6 rounded-full mb-6 shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FaCalendarAlt className="text-4xl text-white" />
          </motion.div>
          
          {/* Text */}
          <motion.p
            className="text-gray-800 font-semibold text-xl mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Лесна и бърза резервация
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            С ReserveBite можете да резервирате маса за минути, без нужда от
            телефонни обаждания или сложни процедури.
          </motion.p>
        </motion.div>

        {/* Benefit 2 */}
        <motion.div
          className="flex flex-col items-center text-center max-w-xs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Icon */}
          <motion.div
            className="bg-[#FF6347] p-6 rounded-full mb-6 shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: -10 }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FaUtensils className="text-4xl text-white" />
          </motion.div>
          
          {/* Text */}
          <motion.p
            className="text-gray-800 font-semibold text-xl mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Богат избор от ресторанти
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Независимо дали търсите ресторант за специален повод, уютна вечеря
            или бизнес среща, сайтът предлага разнообразие от заведения.
          </motion.p>
        </motion.div>

        {/* Benefit 3 */}
        <motion.div
          className="flex flex-col items-center text-center max-w-xs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Icon */}
          <motion.div
            className="bg-[#6A5ACD] p-6 rounded-full mb-6 shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FaCogs className="text-4xl text-white" />
          </motion.div>
          
          {/* Text */}
          <motion.p
            className="text-gray-800 font-semibold text-xl mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Персонализирани филтри и опции
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Филтрирайте по персонални предпочитания като тип кухня, локация и
            дори по наличието на детски менюта или специални изисквания, за да
            намерите ресторанта, който най-добре отговаря на нуждите ви.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default BenefitsSection;
