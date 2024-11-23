import React from "react";
import { FaLeaf, FaFish, FaBreadSlice, FaAppleAlt } from "react-icons/fa"; // Importing icons for visual appeal

const TastePreferences = () => {
  return (
    <div className="bg-[#F5EFED] py-12 px-6">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Предпочитания за вкус</h2>
        <p className="text-lg text-gray-600">
          Открийте ресторанти, които отговарят на вашите хранителни предпочитания.
        </p>
      </div>

      {/* Preferences Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Fish Cuisine */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <FaFish className="text-4xl text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#7F9055] mb-2 text-center">Рибна кухня</h3>
          <p className="text-gray-600 text-center">
            Насладете се на свежи рибни ястия и морски дарове.
          </p>
        </div>

        {/* Gluten-Free */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <FaBreadSlice className="text-4xl text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold text-[#7F9055] mb-2 text-center">Безглутенова храна</h3>
          <p className="text-gray-600 text-center">
            Ястия без глутен, подходящи за хора с чувствителност към него.
          </p>
        </div>

        {/* Healthy Eating */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <FaAppleAlt className="text-4xl text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-[#7F9055] mb-2 text-center">Здравословно хранене</h3>
          <p className="text-gray-600 text-center">
            Здравословни опции с балансирани и питателни съставки.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TastePreferences;
