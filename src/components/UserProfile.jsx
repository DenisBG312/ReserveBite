import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { FaUserAlt, FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewEmail(currentUser.email || "");

        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setFirstName(userDoc.data().firstName || "Без име");
        } else {
          setFirstName("Без име");
        }

        setNewDisplayName(currentUser.displayName || "");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfileUpdate = async () => {
    if (user && newDisplayName) {
      try {
        await updateProfile(user, { displayName: newDisplayName });

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { firstName: newDisplayName });

        setEditMode(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page bg-gradient-to-br from-[#F0F4EF] via-[#E8ECE7] to-[#DDE2DC] min-h-screen flex flex-col items-center py-12">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-lg p-8 transform transition hover:shadow-lg">
        <h2 className="text-4xl font-bold text-[#7F9055] mb-8 text-center">Моят Профил</h2>

        <div className="profile-info mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-[#A2B57F] p-4 rounded-full shadow-md">
              <FaUserAlt className="text-4xl text-white" />
            </div>
            {!editMode ? (
              <h3 className="text-2xl font-semibold text-gray-800">{firstName || "Без име"}</h3>
            ) : (
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7F9055]"
                placeholder="Редактирай име"
              />
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-[#A2B57F] p-4 rounded-full shadow-md">
              <FaEnvelope className="text-4xl text-white" />
            </div>
            {!editMode ? (
              <p className="text-lg text-gray-700">{user.email}</p>
            ) : (
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7F9055]"
                placeholder="Добавете имейл"
              />
            )}
          </div>
        </div>

        <div className="actions mt-8 text-center">
          {editMode ? (
            <button
              onClick={handleProfileUpdate}
              className="bg-[#7F9055] text-white py-2 px-8 rounded-full shadow-md hover:bg-[#A2B57F] transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A2B57F] mb-4"
            >
              Запази промените
            </button>
          ) : (
            <button
              onClick={handleEditProfile}
              className="bg-transparent border-2 border-[#7F9055] text-[#7F9055] py-2 px-8 rounded-full shadow-md hover:bg-[#7F9055] hover:text-white transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A2B57F] mb-4"
            >
              <FaPencilAlt className="inline mr-2" />
              Редактиране на профил
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
