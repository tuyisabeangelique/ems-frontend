import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../../config.js";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();
  const userRole = user.role;

  const fetchLeaves = async () => {
    try {
      console.log("here");
      const response = await axios.get(
        `${config.backendUrl}/leave/${id}/${userRole}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.leaves);
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div>Loading . . .</div>;
  }

  const filterLeaves = (e) => {
    const filteredRecords = leaves.filter((leave) => {
      return (
        leave.leaveType &&
        leave.leaveType.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilteredLeaves(filteredRecords);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">
          {userRole === "admin" ? "View " : "Manage "} Leaves
        </h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Leave Type"
          className="px-4 py-0.5 border"
          onChange={filterLeaves}
        />
        {userRole === "admin" ? (
          <p></p>
        ) : (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Request New Leave
          </Link>
        )}
      </div>
      <table className="mt-4 w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppdercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Reason</th>
            <th className="px-6 py-3">Date Applied </th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave) => {
            return (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">
                  {new Date(leave.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
