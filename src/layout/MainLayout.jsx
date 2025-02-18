import Navbar from "../Pages/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer.jsx";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
