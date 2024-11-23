import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth"; // Firebase methods for auth
import logo from "../assets/logo.png"; // Logo file
import navbarUser from "../assets/navbarUser.png"; // Import custom user image
import { FaBars, FaSignOutAlt, FaUserAlt, FaUtensils, FaCalendarAlt } from "react-icons/fa"; // Import icons

const Header = () => {
  const [user, setUser] = useState(null); // State to track the logged-in user
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const dropdownRef = useRef(null); // Ref for dropdown menu

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state based on login status
    });

    // Close dropdown if clicked outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    // Add event listener for clicks outside of dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth); // Sign out the user
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <>
      <header className="bg-[#F5EFED] py-4 px-6 shadow-md fixed w-full z-[99999999] top-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-3xl font-extrabold text-[#7F9055]">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>

          {/* Navigation for larger screens */}
          <nav className="hidden sm:flex space-x-8 items-center">
            {/* If the user is not logged in */}
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
                {/* If the user is logged in */}
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
                      ref={dropdownRef} // Attach the ref to the dropdown div
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

          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#7F9055] text-3xl hover:text-[#A2B57F]">
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-6 mt-6 bg-[#F5EFED] py-4">
          {/* If the user is not logged in */}
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
              {/* If the user is logged in */}
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
                    ref={dropdownRef} // Attach the ref to the dropdown div
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

      {/* Main Content (Make sure the next section has margin-top to prevent overlap) */}
      <div className="mt-[80px] mb-[40px]">
        {/* Your content below the header */}
        {/* Example: */}

      </div>
    </>
  );
};

export default Header;
