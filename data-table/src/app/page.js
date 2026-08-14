"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import AddForm from "../components/AddForm";

export default function Home() {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const handleAddData = (formData) => {
    // Pehle localStorage se old data lena
    const oldData = localStorage.getItem("users");

    const users = oldData ? JSON.parse(oldData) : [];

    // New ID banana
    const newId =
      users.length > 0
        ? Math.max(...users.map((user) => user.id)) + 1
        : 1;

    // New user
    const newUser = {
      id: newId,
      name: formData.name,
      place: formData.place,
      gender: formData.gender,
      education: formData.education,
      number: formData.number,
    };

 
    users.push(newUser);

    
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Data added successfully!");

    
    setTimeout(() => {
      router.push("/data");
    }, 700);
  };

  return (
    <>
      <Navbar />

      <main className="main-container">

        <div className="page-title">
          <h1>Add Data</h1>
          <p>Add a new record to your data table.</p>
        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <AddForm onSubmit={handleAddData} />

      </main>
    </>
  );
}
