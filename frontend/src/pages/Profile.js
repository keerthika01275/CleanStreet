import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./login.css";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "-",
    location: storedUser?.location || "-",
    address: storedUser?.address || "-",
    role: storedUser?.role || "User",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(storedUser);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />

      <div className="settings-page">
        <h1 style={{color:"white"}}>Account Settings</h1>
        <p className="subtitle"style={{color:"white"}}>Manage your profile details</p>

        <div className="settings-container">

          {/* LEFT CARD */}
          <div className="profile-card">
            <div className="avatar-lg">{formData.name.charAt(0)}</div>
            <h3>{formData.name}</h3>
            <p>{formData.email}</p>
            <span className="badge">{formData.role}</span>
          </div>

          {/* RIGHT CARD */}
          <div className="details-card">
            <h3>Personal Information</h3>

            {/* ================= VIEW MODE ================= */}
            {!isEditing && (
              <div className="info-view">
                <div className="info-item">
                  <span>Full Name</span>
                  <p>{formData.name}</p>
                </div>

                <div className="info-item">
                  <span>Email</span>
                  <p>{formData.email}</p>
                </div>

                <div className="info-item">
                  <span>Phone</span>
                  <p>{formData.phone}</p>
                </div>

                <div className="info-item">
                  <span>Location</span>
                  <p>{formData.location}</p>
                </div>

                <div className="info-item">
                  <span>Address</span>
                  <p>{formData.address}</p>
                </div>

                <div className="info-item">
                  <span>Role</span>
                  <p>{formData.role}</p>
                </div>

                <button className="btn-save" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>
            )}

            {/* ================= EDIT MODE ================= */}
            {isEditing && (
              <>
                <div className="form-row">
                  <div>
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Location</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label>Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Role</label>
                    <input
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn-save" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}