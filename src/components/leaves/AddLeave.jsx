import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ems-server-angelique-tuyisabes-projects.vercel.app/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 ">Request New Leave</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Leave Type */}
        <div className="col-span-2">
          <label className=" block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            name="leaveType"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        {/* From date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* To date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <input
            type="string"
            name="reason"
            onChange={handleChange}
            placeholder="Reason"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="col-span-2 w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Request Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
