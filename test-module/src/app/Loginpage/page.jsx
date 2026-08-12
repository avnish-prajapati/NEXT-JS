"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // Local Storage me purane users nikalo
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Naya user sabse upar add hoga
    users.unshift(user);

    // Updated array Local Storage me save karo
    localStorage.setItem("users", JSON.stringify(users));

    // Login ke baad Homepage par bhej do
    router.push("/Homepage");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-5">Login Page</h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
