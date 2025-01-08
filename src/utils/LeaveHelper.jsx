import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "Serial No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "134px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  { name: "Action", selector: (row) => row.action, center: true },
];

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leave/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-500 text-white rounded hover:bg-teal-500 transition duration-200"
      onClick={() => handleView(_id)}
    >
      View
    </button>
  );
};
