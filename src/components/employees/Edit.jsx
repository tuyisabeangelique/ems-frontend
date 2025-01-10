import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import config from "../../../config.js";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  // Fetch data for departments to put in select depts form field
  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // Get the Employee so the form is pre-filled out
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${config.backendUrl}/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          console.log("response employee: ", response.data.employee);

          const employee = response.data.employee;
          setEmployee((prevData) => ({
            ...prevData,
            name: employee.userId.name,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department.dep_name,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("employee 2: ", response.data.employee);
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    console.log("Right before submitting, employee is:");
    for (const [key, value] of Object.entries(employee)) {
      console.log(key, value);
    }

    // pass data to server side to edit employee in database

    try {
      const response = await axios.put(
        `${config.backendUrl}/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(
          "after submitting, employee is:",
          response.data.updatedEmployee,
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

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 ">Edit Employee</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Insert Name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* We don't want to change all values */}

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>

              <select
                name="gender"
                onChange={handleChange}
                value={employee.gender}
                placeholder="Select Gender"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>

              <select
                name="maritalStatus"
                onChange={handleChange}
                value={employee.maritalStatus}
                placeholder="Select Marital Status"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="string"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                placeholder="Insert Designation "
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Department */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                value={employee.department}
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

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                placeholder="Insert Salary "
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading . . .</div>
      )}
    </>
  );
};

export default Edit;
