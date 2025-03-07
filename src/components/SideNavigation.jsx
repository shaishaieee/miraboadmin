import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUpload, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUsersLine } from "react-icons/fa6";
import Logo from "../assets/images/logo.png";
import Header from "./Header";

const SideNavigation = ({ children }) => {
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isSideNavMinimized, setIsSideNavMinimized] = useState(false);

  const toggleSideNav = () => setIsSideNavMinimized(!isSideNavMinimized);
  const toggleMobileNav = () => setIsSideNavOpen(!isSideNavOpen);
  const closeMobileNav = () => setIsSideNavOpen(false);

  const menuItem = [
    { path: "/dashboard", name: "ダッシュボード", icon: <AiFillDashboard /> },
    { path: "/usermanagement", name: "管理ユーザー情報", icon: <FaUsers /> },
    { path: "/totalusersinfo", name: "合計ユーザー情報", icon: <FaUsersLine /> },
    { path: "/userprofile", name: "ユーザープロフィール", icon: <FaUser /> },
    { path: "/csvexcelupload", name: "CSV/Excelアップロード", icon: <FaUpload /> },
  ];

  const handleLogout = () => {
    const confirmed = window.confirm("ログアウトしますか？");
    if (confirmed) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
    
      <button
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md md:hidden"
        onClick={toggleMobileNav}
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>

    
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg z-40 transition-all duration-300 
          ${isSideNavMinimized ? "w-20" : "w-70"}
          ${isSideNavOpen ? "w-full h-full md:w-64 md:h-screen" : "md:block hidden"}
        `}
      >
     
        <div className="flex items-center gap-4 p-4 border-b border-gray-700">
          <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full bg-white" />
          <h2 className={`text-lg font-light ${isSideNavMinimized ? "hidden" : "block"}`}>Admin MIRABO</h2>
        </div>

      
        <div className="mt-6">
          {menuItem.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center gap-4 p-3 mx-4 rounded-lg text-gray-300 hover:bg-gray-700 transition"
              onClick={closeMobileNav}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`${isSideNavMinimized ? "hidden" : "block"}`}>{item.name}</span>
            </NavLink>
          ))}

        
          <div
            className="flex items-center gap-4 p-3 mx-4  rounded-lg text-gray-300 hover:bg-gray-700 transition cursor-pointer"
            onClick={handleLogout}
          >
            <IoLogOut className="text-xl" />
            <span className={`${isSideNavMinimized ? "hidden" : "block"}`}>ログアウト</span>
          </div>
        </div>
      </div>

     
      <main
        className={`mt-[10vh] mx-auto mb-5 transition-all duration-300
          ${isSideNavMinimized ? "md:ml-20 md:w-[calc(100vw-4rem)]" : "md:ml-70 md:w-[calc(100vw-19rem)]"}
        `}
      >
        <Header toggleSideNav={toggleSideNav} toggleMobileNav={toggleMobileNav}/>
        {children}
      </main>
    </>
  );
};

export default SideNavigation;
