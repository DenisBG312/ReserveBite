import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/logo.png";
import navbarUser from "../assets/navbarUser.png";
import { FaBars, FaSignOutAlt, FaUserAlt, FaUtensils, FaCalendarAlt } from "react-icons/fa";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <header className="bg-[#F5EFED] py-4 px-6 shadow-md fixed w-full z-[99999999] top-0">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-3xl font-extrabold text-[#7F9055]">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>

          <nav className="hidden sm:flex space-x-8 items-center">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-white bg-[#7F9055] hover:bg-[#A2B57F] py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105">
                  Влез
                </Link>
                <Link
                  to="/register"
                  className="text-[#7F9055] border-2 border-[#7F9055] hover:text-white hover:bg-[#7F9055] py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105">
                  Регистриране
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-[#7F9055] hover:text-[#A2B57F] text-lg font-semibold transform hover:scale-105 transition duration-300 flex items-center">
                  <FaUtensils className="mr-2" /> Начало
                </Link>
                <Link to="/reservations" className="text-[#7F9055] hover:text-[#A2B57F] text-lg font-semibold transform hover:scale-105 transition duration-300 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Резервации
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-[#7F9055] hover:text-[#A2B57F] text-lg font-semibold transform hover:scale-105 transition duration-300">
                    <img
                      src={navbarUser}
                      alt="User Icon"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    Профил
                  </button>
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                      <Link to="/profile" className="block px-4 py-2 text-[#7F9055] hover:bg-[#F5EFED]">Моят профил</Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-[#7F9055] hover:bg-[#F5EFED]">
                        Излез <FaSignOutAlt className="inline ml-2" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#7F9055] text-3xl hover:text-[#A2B57F]">
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-6 mt-6 bg-[#F5EFED] py-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white bg-[#7F9055] hover:bg-[#A2B57F] py-2 px-6 rounded-full text-lg font-semibold transition duration-300">
                Влез
              </Link>
              <Link
                to="/register"
                className="text-[#7F9055] border-2 border-[#7F9055] hover:text-white hover:bg-[#7F9055] py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105">
                Регистриране
              </Link>
            </>
          ) : (
            <>
              <Link to="/restaurants" className="text-[#7F9055] hover:text-[#A2B57F] text-lg font-semibold">
                <FaUtensils className="mr-2" /> Ресторанти
              </Link>
              <Link to="/reservations" className="text-[#7F9055] hover:text-[#A2B57F] text-lg font-semibold">
                <FaCalendarAlt className="mr-2" /> Резервации
              </Link>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-[#7F9055] hover:text-[#A2B57F] text-lg font-semibold">
                  <img
                    src={navbarUser}
                    alt="User Icon"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  Профил
                </button>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-[#7F9055] hover:bg-[#F5EFED]">Моят профил</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-[#7F9055] hover:bg-[#F5EFED]">
                      Излез <FaSignOutAlt className="inline ml-2" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-[80px] mb-[40px]">
      </div>
    </>
  );
};

export default Header;
