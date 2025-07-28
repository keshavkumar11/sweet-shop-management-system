// src/components/Layout.jsx
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header className="bg-pink-200 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Sweet Shop</h1>
        <nav>
          <Link to="/" className="mx-2">Home</Link>
          <Link to="/products" className="mx-2">Products</Link>
          <Link to="/admin/dashboard" className="mx-2">Dashboard</Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </>
  );
};

export default Layout;
