'use client';
import { useState, useEffect } from "react";
import Profile from "@/components/Profile";
const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('authUser');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      {user ? (
        <Profile {...user} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </>
  );
}

export default ProfilePage;
