import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/summary",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setSummary(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading . . .</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          number={summary.totalEmployees}
          text="Total Employees"
          color="bg-teal-600"
        />

        <SummaryCard
          icon={<FaBuilding />}
          number={summary.totalDepartments}
          text="Total Departments"
          color="bg-yellow-600"
        />

        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Total Salaries"
          number={summary.totalSalary}
          color="bg-red-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            number={summary.appliedFor}
            text="Total Leaves Applied"
            color="bg-gray-600"
          />

          <SummaryCard
            icon={<FaCheckCircle />}
            number={summary.leaveSummary.approved}
            text="Total Leaves Approved"
            color="bg-green-800"
          />

          <SummaryCard
            icon={<FaHourglassHalf />}
            number={summary.leaveSummary.pending}
            text="Total Leaves Pending"
            color="bg-yellow-600"
          />

          <SummaryCard
            icon={<FaTimesCircle />}
            number={summary.leaveSummary.rejected}
            text="Total Leaves Rejected"
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
