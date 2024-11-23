import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchSection from "./components/SearchSection";
import TopRestaurants from "./components/TopRestaurants";
import TastePreferences from "./components/TastePreferences";
import BenefitsSection from "./components/BenefitsSection";
import UserProfile from "./components/UserProfile";
import Register from "./components/RegisterPage";
import Login from "./components/LoginPage";
import RestaurantDetails from "./components/RestaurantDetails";
import ReservationsPage from "./components/ReservationsPage";
import Restaurants from "./components/Restaurants";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchSection />
                  <TopRestaurants />
                  <TastePreferences />
                  <BenefitsSection />
                </>
              }
            />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservations" element={<ReservationsPage />} /> {/* Add this route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
