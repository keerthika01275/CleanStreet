import React, { useState } from "react";
import "./login.css";
import Navbar from "../components/Navbar";

// Reusable password input component
function PasswordInput({ label, value, setValue, show, setShow }) {
  return (
    <div className="password-input-wrapper">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="password-input"
      />
      <span className="password-eye" onClick={() => setShow(!show)}>
        {show ? "🙈" : "👁️"}
      </span>
    </div>
  );
}

export default function Security() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = () => {
    setError("");
    setSuccess("");

    if (!current || !newPass || !confirm) {
      setError("All fields are required");
      return;
    }

    if (newPass !== confirm) {
      setError("New password and confirm password must match");
      return;
    }

    // ✅ Backend-ready placeholder
    setSuccess("Password validation passed. Ready for backend update.");
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <h2 className="settings-title" style={{color:'white'}}>Account Settings</h2>
        <p className="settings-sub" style={{color:"whitesmoke"}}>
          Manage your profile details and security.
        </p>

        <div className="settings-container">
          {/* LEFT CARD */}
          <div className="profile-card">
            <div className="avatar-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <span className="badge">{user?.role || "User"}</span>
          </div>

          {/* RIGHT CARD */}
          <div className="details-card">
            <h3>Change Password</h3>

            <PasswordInput
              label="Current Password"
              value={current}
              setValue={setCurrent}
              show={showCurrent}
              setShow={setShowCurrent}
            />

            <PasswordInput
              label="New Password"
              value={newPass}
              setValue={setNewPass}
              show={showNew}
              setShow={setShowNew}
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirm}
              setValue={setConfirm}
              show={showConfirm}
              setShow={setShowConfirm}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <button
              className="login-btn"
              onClick={handleUpdate}
              disabled={!current || !newPass || !confirm}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* Eye icon style */
const eyeStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "16px",
};