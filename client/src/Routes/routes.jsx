import { createBrowserRouter } from "react-router-dom";
import Login from "../compoonents/authendication/Login";
import Register from "../compoonents/authendication/Register";
import Layout from "../compoonents/Layout/UserLayout";
import FindJob from "../UserPages/Findjob";
import FindEmployers from "../UserPages/FindEmployers";
import JobDescription from "../UserPages/JobDescription";
import PaymentIntegration from "../UserPages/PaymentIntegration";
import OtpVerification from "../compoonents/authendication/OtpVerify";

// import Dashboard from "../pages/DashboardLayout";
import AppliedJobs from "../UserPages/Dashboard pages/AppliedJobs";
import SavedJobs from "../UserPages/Dashboard pages/SavedJobs";
import ApplicationTracking from "../UserPages/Dashboard pages/ApplicationTracking";
import JobAlerts from "../UserPages/JobAlerts";
import SettingsPage from "../UserPages/Dashboard pages/Settings";
import OverviewContent from "../UserPages/Dashboard pages/Overview";
import PublicRoute from "../Utils/BublicRoute";
import ProtectedRoute from "../Utils/PrivateRoute";
import Landingpage from "../compoonents/authendication/Landingpage";

// Define routes
const router = createBrowserRouter([
  // Authentication Routes
  { path: "/login", element:<PublicRoute element={<Login/>} />}, 
  { path: "/authentication/register", element:<PublicRoute element={<Register/>} />},
  { path: "/otpverify",element:<PublicRoute element={<OtpVerification/>} />},
  { path: "/payment",element:<PaymentIntegration/>},
  { path: "/",element:<Landingpage/>},

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
