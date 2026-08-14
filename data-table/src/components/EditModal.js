"use client";

import { useState } from "react";

export default function EditModal({
  user,
  onUpdate,
  onClose,
}) {

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    place: user.place,
    gender: user.gender,
    education: user.education,
    number: user.number,
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

    onUpdate(formData);

  };

  return (
    <div className="modal-background">

      <div className="modal-box">

        <div className="modal-header">

          <h2>Edit Record</h2>

          <button onClick={onClose}>
            ×
          </button>

        </div>

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
              maxLength="10"
              value={formData.number}
              onChange={handleChange}
            />

          </div>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-button"
            >
              Update
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}