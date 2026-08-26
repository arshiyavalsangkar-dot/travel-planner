import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Itinerary from "./pages/Itinerary";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Packing from "./pages/Packing";
import Notes from "./pages/Notes";
import Destinations from "./pages/Destinations";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>

          {/* ==================== DEFAULT ==================== */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* ==================== AUTH ==================== */}

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Forgot Password */}
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

{/* Reset Password */}
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

          {/* Register / Sign Up */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* ==================== PROTECTED ==================== */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <Trips />
              </ProtectedRoute>
            }
          />

          <Route
            path="/itinerary"
            element={
              <ProtectedRoute>
                <Itinerary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            }
          />

          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/packing"
            element={
              <ProtectedRoute>
                <Packing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/destinations"
            element={
              <ProtectedRoute>
                <Destinations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ==================== UNKNOWN URL ==================== */}

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}