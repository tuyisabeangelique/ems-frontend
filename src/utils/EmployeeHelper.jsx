import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "Serial No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  { name: "Action", selector: (row) => row.action, center: true },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      "https://ems-server-angelique-tuyisabes-projects.vercel.app/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// Helper method for AddSalary
export const fetchEmployees = async (id) => {
  // We are passing in the department id, so we can fetch all employees in the associated department
  let employees;
  try {
    const response = await axios.get(
      `https://ems-server-angelique-tuyisabes-projects.vercel.app/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-red-500 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
      >
        Salary
      </button>

      <button
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-red-500 transition duration-200"
        onClick={() =>
          navigate(`/admin-dashboard/employee/leave-history/${_id}`)
        }
      >
        Leave
      </button>
    </div>
  );
};
