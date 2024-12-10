import { createBrowserRouter } from "react-router-dom";

// Auth imports....
import Login from "../compoonents/authendication/Login";
import Register from "../compoonents/authendication/Register";
import FindJob from "../UserPages/Findjob";
import JobDescription from "../UserPages/JobDescription";
import PaymentIntegration from "../UserPages/PaymentIntegration";
import OtpVerification from "../compoonents/authendication/OtpVerify";

// Candidate imports.....
import Candidatelayout from "../compoonents/Layout/candidatelayout";
import AppliedJobs from "../UserPages/Dashboard pages/AppliedJobs";
import SavedJobs from "../UserPages/Dashboard pages/SavedJobs";
import ApplicationTracking from "../UserPages/Dashboard pages/ApplicationTracking";
import JobAlerts from "../UserPages/JobAlerts";
import SettingsPage from "../UserPages/Dashboard pages/Settings";
import OverviewContent from "../UserPages/Dashboard pages/Overview";
import PublicRoute from "../Utils/BublicRoute";
import ProtectedRoute from "../Utils/PrivateRoute";
import Landingpage from "../compoonents/authendication/Landingpage";



// Employer imports ....
import EmployerDashboard from "../compoonents/Layout/EmployerDashboard";
import EmployerOverview from "../EmployerPages/EmployerOverview";
import EmployerProfile from "../EmployerPages/Profile";
import PostJob from "../EmployerPages/Postjob";
import MyJobs from "../EmployerPages/Myjobs";
import Savedcandidates from "../EmployerPages/Savedcandidates";
import EmployerSettings from "../EmployerPages/Settings"



// Define routes
const router = createBrowserRouter([
  // Authentication Routes
  { path: "/login", element:<PublicRoute element={<Login/>} />}, 
  { path: "/authentication/register", element:<PublicRoute element={<Register/>} />},
  { path: "/otpverify",element:<PublicRoute element={<OtpVerification/>} />},
  { path: "/payment",element:<PaymentIntegration/>},
  { path: "/",element:<Landingpage/>},

  // Candidate routes ........
  {
    path: "/candidatelayout",
    element: <ProtectedRoute><Candidatelayout/></ProtectedRoute>,
    children: [
       
       // Main Candidate pages
      { index: true,  element: <OverviewContent /> },
      { path: "findjob", element: <FindJob /> },
      { path: "findjob/jobdescription", element: <JobDescription /> },
      { path: "appliedjobs", element: <AppliedJobs /> },
      { path: "savedjobs", element: <SavedJobs /> },
      { path: "applicationtracking", element: <ApplicationTracking /> },
      { path: "jobalerts", element: <JobAlerts /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  // Employers routes................
  {path:"EmployerDashboard",
    element:<ProtectedRoute><EmployerDashboard/></ProtectedRoute>,
    children : [
      {index:true,element:<EmployerOverview/>},
      {path:"employerprofile", element:<EmployerProfile/>},
      {path:"postjob", element:<PostJob/>},
      {path:"myjobs", element:<MyJobs/>},
      {path:"savedcandidates", element:<Savedcandidates/>},
      {path:"employersettings", element:<EmployerSettings/>},

    ]
  },


  // Fallback Route
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);

export default router;
