import axios from "axios";
import React, { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import config from "../../../config.js";

import DataTable from "react-data-table-component";

const AdminLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,

          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons _id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleFilter = (e) => {
    const records = leaves.filter((leave) => {
      return leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredLeaves(records);
  };

  const filterByButton = (inputStatus) => {
    if (inputStatus === "All") {
      fetchLeaves();
    }
    const records = leaves.filter((leave) => {
      return leave.status.toLowerCase().includes(inputStatus.toLowerCase());
    });
    setFilteredLeaves(records);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mt-2 mb-2">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mb-5">
            <input
              type="text"
              placeholder="Search by Employee ID"
              className="px-4 py-0.5 border"
              onChange={handleFilter}
            />
            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-blue-600 text-white hover:bg-blue:700 rounded"
                onClick={() => filterByButton("All")}
              >
                View All
              </button>
              <button
                className="px-2 py-1 bg-yellow-600 text-white hover:bg-yellow:700 rounded"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal:700 rounded"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
              <button
                className="px-2 py-1 bg-red-600 text-white hover:bg-red:700 rounded"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
            </div>
          </div>
          <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
      ) : (
        <div>Loading. . .</div>
      )}
    </>
  );
};

export default AdminLeaves;
