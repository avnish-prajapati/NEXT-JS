"use client";

import { useEffect, useState } from "react";

export default function Homepage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Local Storage se saare users nikalo
    const data = JSON.parse(localStorage.getItem("users")) || [];

    //  // State me save kar do
    setUsers(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Home Page</h1>

      {/* Latest User */}

      {users.length > 0 && (
        <div className="bg-green-200 p-5 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-2">Latest Login User</h2>

          <p>
            <b>Email :</b> {users[0].email}
          </p>

          <p>
            <b>Password :</b> {users[0].password}
          </p>
        </div>
      )}

      {/* Previous Users */}

      <div className="grid md:grid-cols-2 gap-5">
        {users.slice(1).map((user, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-5">
            <h2 className="font-bold text-lg mb-3">User {index + 1}</h2>

            <p>
              <b>Email :</b> {user.email}
            </p>

            <p>
              <b>Password :</b> {user.password}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
