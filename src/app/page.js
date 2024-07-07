'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Home = () => {
  let [registeredUsers, setRegisteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
    if (loggedUserFromStorage.length > 0 || loggedUserFromStorage.email) {
      const usersFromStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      setRegisteredUsers(usersFromStorage.filter(users => !users.isDelete));
    } else {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, []);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="card w-auto bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Correo</th>
                    <th>Nombre(s)</th>
                    <th>Apellido(s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="3" className="text-center">No existen usuarios registrados</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
