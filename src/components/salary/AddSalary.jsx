import React, { useEffect, useState } from "react";
import { fetchDepartments, fetchEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  // Fetch data for departments to put in select depts form field
  const [salary, setSalary] = useState({
    employeeId: null,
    salary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://ems-server-angelique-tuyisabes-projects.vercel.app/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(
          "after submitting, employee is:",
          response.data.updatedEmp,
          " and user is:",
          response.data.updatedUser
        );
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && !error.response.data.success) {
        console.log(error.response.data);
        alert(error.response.data.error);
      }
    }
  };

  const handleDeptChange = async (e) => {
    // Whichever dept we choose, we want to set employees to the emps in that dept

    const empsInSameDept = await fetchEmployees(e.target.value);
    setEmployees(empsInSameDept);
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 ">Add New Salary</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                onChange={handleDeptChange}
                placeholder="Select Department"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {/* Fetch Dept Data from Database and Display the other options */}
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <select
                name="employeeId"
                onChange={handleChange}
                placeholder="Select Employee"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Employee</option>
                {/* Fetch Dept Data from Database and Display the other options */}
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="Insert Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Monthly Allowances */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Allowances
              </label>
              <input
                type="number"
                name="allowances"
                onChange={handleChange}
                placeholder="Insert Monthly Allowances"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                onChange={handleChange}
                placeholder="Insert Monthly Deductions"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="col-span-2 w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading . . .</div>
      )}
    </>
  );
};

export default AddSalary;
