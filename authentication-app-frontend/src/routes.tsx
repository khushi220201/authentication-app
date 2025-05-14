import { createBrowserRouter } from "react-router-dom";
import CustomerRegister from "./pages/Register/CustomerRegister";
import AdminRegister from "./pages/Register/AdminRegister";
import VerificationPage from "./pages/Verification/VerificationPage";
import AdminLogin from "./pages/Login/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";

const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <AdminRegister />,
  },
  {
    path: "/customer-register", 
    element: <CustomerRegister />,
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/verify-email",
    element: <VerificationPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default routes;
