import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  // When we fetch employees from db, we set it here
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setEmpLoading(true);
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://ems-server-angelique-tuyisabes-projects.vercel.app/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                className="rounded-full"
                src={`https://ems-server-angelique-tuyisabes-projects.vercel.app/${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => {
      return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredEmployees(records);
  };

  return (
    <>
      {empLoading ? (
        <div>Loading. . .</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Employee Name"
              className="px-4 py-0.5 border"
              onChange={handleFilter}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div className="mt-5 ">
            <DataTable columns={columns} data={filteredEmployees} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default List;
