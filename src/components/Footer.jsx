import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#F5EFED] py-12 px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex flex-col items-center mb-8 sm:mb-0">
          <div className="mb-4">
            <img src={logo} alt="ReserveBite Logo" className="h-26" />
          </div>

          <div className="flex space-x-6">
            <FaFacebook className="text-5xl text-[#3b5998] cursor-pointer" />
            <FaInstagram className="text-5xl text-[#C13584] cursor-pointer" />
            <FaTwitter className="text-5xl text-[#1DA1F2] cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between space-x-8">
          <div className="space-y-2 text-gray-800">
            <h3 className="font-bold text-lg">За ReserveBite</h3>
            <ul>
              <li><a href="#" className="hover:text-[#7F9055]">За нас</a></li>
              <li><a href="#" className="hover:text-[#7F9055]">Често задавани въпроси</a></li>
              <li><a href="#" className="hover:text-[#7F9055]">Контакти</a></li>
            </ul>
          </div>

          <div className="space-y-2 text-gray-800">
            <h3 className="font-bold text-lg">Легенда</h3>
            <ul>
              <li><a href="#" className="hover:text-[#7F9055]">Политика за бисквитки</a></li>
              <li><a href="#" className="hover:text-[#7F9055]">Политика на поверителност</a></li>
              <li><a href="#" className="hover:text-[#7F9055]">Политика за връщане</a></li>
              <li><a href="#" className="hover:text-[#7F9055]">Правила и условия</a></li>
              <li><a href="#" className="hover:text-[#7F9055]">Защита на потребителите</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
