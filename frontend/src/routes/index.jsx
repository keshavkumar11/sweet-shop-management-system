import Login from "../pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import ProductsPage from "../pages/ProductsPage";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected route for admin */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute role="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Protected route for user */}
      <Route
        path="/products"
        element={
            <PrivateRoute role="user">
                <ProductsPage/>
            </PrivateRoute>
        }
        />

        <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
};
export default AppRoutes;
