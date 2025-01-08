import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import List from "./components/employees/List.jsx";
import Add from "./components/employees/Add.jsx";
import View from "./components/employees/View.jsx";
import Edit from "./components/employees/Edit.jsx";
import AddSalary from "./components/salary/AddSalary.jsx";
import ViewSalary from "./components/salary/ViewSalary.jsx";
import EmployeeSummaryCard from "./components/EmployeeDashboard/EmployeeSummaryCard.jsx";
import LeaveList from "./components/leaves/LeaveList.jsx";
import AddLeave from "./components/leaves/AddLeave.jsx";
import EmployeeSettings from "./components/EmployeeDashboard/EmployeeSettings.jsx";
import AdminLeaves from "./components/leaves/AdminLeaves.jsx";
import AdminViewLeave from "./components/leaves/AdminViewLeave.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            // We want to make sure that only the admin can access the AdminDashboard. PrivateRoutes checks that the user is logged in. RoleBasedRoutes checks that the user is admin.
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/settings"
            element={<EmployeeSettings />}
          ></Route>
          <Route
            path="/admin-dashboard/leaves"
            element={<AdminLeaves />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/leave-history/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/admin-dashboard/leave/:id"
            element={<AdminViewLeave />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route
            path="/admin-dashboard/employee/:id"
            element={<View />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/edit/:id"
            element={<Edit />}
          ></Route>

          <Route path="/admin-dashboard/salary" element={<AddSalary />}></Route>
          <Route
            path="/admin-dashboard/employee/salary/:id"
            element={<ViewSalary />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummaryCard />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<View />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves/:id"
            element={<LeaveList />}
          ></Route>

          <Route
            path="/employee-dashboard/add-leave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/:id/"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/employee-dashboard/settings"
            element={<EmployeeSettings />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
