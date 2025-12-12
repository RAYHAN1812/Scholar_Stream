import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home";
import AllScholarships from "../pages/Scholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import CheckoutPage from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import NotFound from "../pages/NotFound";

// Shared Dashboard
import Profile from "../pages/Dashboard/Shared/Profile";

// Admin Pages
import AddScholarship from "../pages/admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/AdminManageUsers";
import Analytics from "../pages/admin/AdminAnalytics";

// Moderator Pages
import ManageApplications from "../pages/Moderator/ManageApplications";
import AllReviews from "../pages/Moderator/AllReviews";

// Student Pages
import MyApplications from "../pages/Dashboard/Admin/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Admin/Student/MyReviews";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import StudentRoute from "./StudentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "scholarships", element: <AllScholarships /> },

      // Scholarship single details
      { path: "scholarship/:id", element: <ScholarshipDetails /> },

      // Auth
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Checkout + Payments
      {
        path: "checkout/:scholarshipId",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/failed",
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Root
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "profile", element: <Profile /> },

      // ----- Admin -----
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },

      // ----- Moderator -----
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        ),
      },

      // ----- Student -----
      {
        path: "my-applications",
        element: (
          <StudentRoute>
            <MyApplications />
          </StudentRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <StudentRoute>
            <MyReviews />
          </StudentRoute>
        ),
      },
    ],
  },

  // Catch All
  { path: "*", element: <NotFound /> },
]);
