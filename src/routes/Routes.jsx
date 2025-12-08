// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllScholarships from "../pages/Scholarship/AllScholarships";
import ScholarshipDetails from "../pages/Scholarship/ScholarshipDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CheckoutPage from "../pages/Payment/CheckoutPage";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import StudentRoute from "./StudentRoute";
import ErrorPage from "../pages/shared/ErrorPage";

// Admin Dashboard Pages
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";

// Moderator Dashboard Pages
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";

// Student Dashboard Pages
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import Profile from "../pages/Dashboard/shared/Profile";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "all-scholarships", element: <AllScholarships /> },
      { path: "scholarship/:id", element: <ScholarshipDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Private Routes
      {
        path: "checkout",
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Shared
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // Admin Routes
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

      // Moderator Routes
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

      // Student Routes
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
]);
