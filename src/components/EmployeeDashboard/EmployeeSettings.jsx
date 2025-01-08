import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import axios from "axios";

const EmployeeSettings = () => {
  // Allow user to change password

  const navigate = useNavigate();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (settings.newPassword !== settings.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      try {
        const response = await axios.put(
          "https://ems-server-angelique-tuyisabes-projects.vercel.app/api/settings/change-password",
          settings,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/employee-dashboard");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-x-3xl mx-auto bg-white p-8 rounded-md shadow-md w-96 mt-9">
      <h2 className=" text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Previous Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter Previous Password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-teal-600 text-white py-2">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeSettings;
