import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import config from "../../../config.js";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();
  const role = user.role;

  const fetchSalaries = async () => {
    try {
      console.log("hi 0");
      const response = await axios.get(
        `${config.backendUrl}/salary/${id}/${role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const filteredRecords = salaries.filter((salary) => {
      return (
        salary.employeeId &&
        salary.employeeId.employeeId &&
        salary.employeeId.employeeId
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    });
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading . . .</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search by Employee ID"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppdercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => {
                  return (
                    <tr
                      key={salary.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-3">{salary.salary}</td>
                      <td className="px-6 py-3">{salary.allowances}</td>
                      <td className="px-6 py-3">{salary.deductions}</td>
                      <td className="px-6 py-3">{salary.netSalary}</td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No Records to Display</div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
