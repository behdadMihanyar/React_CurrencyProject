import Navbar from "../Pages/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
