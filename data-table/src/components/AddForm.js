"use client";

import { useState } from "react";

export default function AddForm({ onSubmit }) {

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    gender: "",
    education: "",
    number: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.place ||
      !formData.gender ||
      !formData.education ||
      !formData.number
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.number.length !== 10) {
      setError(
        "Number must contain 10 digits."
      );
      return;
    }

    setError("");

    onSubmit(formData);

    setFormData({
      name: "",
      place: "",
      gender: "",
      education: "",
      number: "",
    });
  };

  return (
    <div className="form-box">

      <h2>Add New Record</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Name */}

        <div className="form-group">

          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />

        </div>

        {/* Place */}

        <div className="form-group">

          <label>Place</label>

          <input
            type="text"
            name="place"
            placeholder="Enter place"
            value={formData.place}
            onChange={handleChange}
          />

        </div>

        {/* Gender */}

        <div className="form-group">

          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>

        </div>

        {/* Education */}

        <div className="form-group">

          <label>Education</label>

          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
          >

            <option value="">
              Select Education
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="MCA">
              MCA
            </option>

            <option value="B.Tech">
              B.Tech
            </option>

            <option value="BBA">
              BBA
            </option>

            <option value="MBA">
              MBA
            </option>

          </select>

        </div>

        {/* Number */}

        <div className="form-group">

          <label>Number</label>

          <input
            type="text"
            name="number"
            placeholder="Enter 10 digit number"
            value={formData.number}
            onChange={handleChange}
            maxLength="10"
          />

        </div>

        <button
          type="submit"
          className="add-button"
        >
          Add Data
        </button>

      </form>

    </div>
  );
}