import { createBrowserRouter } from "react-router-dom";
import Login from "../compoonents/authendication/Login";
import Register from "../compoonents/authendication/Register";
import Layout from "../compoonents/Layout/Layout";
import FindJob from "../pages/Findjob";
import FindEmployers from "../pages/FindEmployers";
import JobDescription from "../pages/JobDescription";
import PaymentIntegration from "../pages/PaymentIntegration";
import OtpVerification from "../compoonents/authendication/OtpVerify";

// import Dashboard from "../pages/DashboardLayout";
import AppliedJobs from "../pages/Dashboard pages/AppliedJobs";
import SavedJobs from "../pages/Dashboard pages/SavedJobs";
import ApplicationTracking from "../pages/Dashboard pages/ApplicationTracking";
import JobAlerts from "../pages/JobAlerts";
import SettingsPage from "../pages/Dashboard pages/Settings";
import OverviewContent from "../pages/Dashboard pages/Overview";
import PublicRoute from "../Utils/BublicRoute";
import ProtectedRoute from "../Utils/PrivateRoute";

// Define routes
const router = createBrowserRouter([
  // Authentication Routes
  { path: "/", element:<PublicRoute element={<Login/>} />}, 
  { path: "/authentication/register", element:<PublicRoute element={<Register/>} />},
  { path: "/otpverify",element:<PublicRoute element={<OtpVerification/>} />},
  { path: "/payment",element:<ProtectedRoute element={<PaymentIntegration/>} />},

  // Protected Routes (PrivateRoute ensures authentication)
  {
    path: "/layout",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
       
       // Main Dashboard page
      { index: true,  element: <OverviewContent /> },
      { path: "findjob", element: <FindJob /> },
      { path: "findemployers", element: <FindEmployers /> },
      { path: "findjob/jobdescription", element: <JobDescription /> },
      { path: "appliedjobs", element: <AppliedJobs /> },
      { path: "savedjobs", element: <SavedJobs /> },
      { path: "applicationtracking", element: <ApplicationTracking /> },
      { path: "jobalerts", element: <JobAlerts /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  // Fallback Route
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);

export default router;
