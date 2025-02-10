import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUpload, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import Logo from "../assets/images/logo.png";
import Header from "./Header";
import { FaUsersLine } from "react-icons/fa6";


const SideNavigation = ({ children }) => {
  
    const navigate = useNavigate();
    const [isSideNavMinimized, setIsSideNavMinimized] = useState(false);
    const toggleSideNav = () => setIsSideNavMinimized(!isSideNavMinimized);
  
    const menuItem = [
      { path: "/dashboard", name: "ダッシュボード", icon: <AiFillDashboard /> },
      { path: "/usermanagement", name: "ユーザー管理", icon: <FaUsers /> },
      { path: "/totalusersinfo", name: "合計ユーザー情報", icon: <FaUsersLine />},
      { path: "/userprofile", name: "ユーザープロフィール", icon: <FaUser /> },
      { path: "/csvexcelupload", name: "CSV/Excelアップロード", icon: <FaUpload /> },
    ];
  
    const handleLogout = () => {
      const confirmed = window.confirm("ログアウトしますか？");
      if (confirmed){
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        navigate("/");
      }
    };
  
    return (
      <>
        <Header toggleSideNav={toggleSideNav} isSideNavMinimized={isSideNavMinimized} />
        <div className="absolute">
          <div className={`fixed bg-[var(--bgc-sidenav)] h-screen shadow-2xl ${isSideNavMinimized ? "w-[70px]" : "w-[250px]"}`}>

            <div className="flex justify-start items-center gap-[10px] px-[10px] py-[10px] border-b border-[#c2c7d039]">
              <img className="w-[40px] h-[40px] cursor-pointer bg-white rounded-full shadow-2xl" src={Logo} alt="Logo" />
              <h2 className={`font-light text-[var(--fontcolor-side)] text-[18px] cursor-pointer hover:text-white ${isSideNavMinimized ? "hidden" : ""}`}>Admin MIRABO</h2>
            </div>

            <div className="mt-[30px]">
              {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="flex items-center font-semibold gap-[20px] m-[10px] text-[var(--fontcolor-side)] py-[5px] px[10px] hover:bg-[var(--fontcolor-side)] hover:text-[var(--bgc-sidenav)] rounded-[5px]">
                  <div className="text-[26px] ml-2">{item.icon}</div>
                  <div className={`text-[16px] ${isSideNavMinimized ? "hidden" : ""}`}>
                    {item.name}
                  </div>
                </NavLink>
              ))}

              <div className="group flex gap-[20px] items-center my-0 mx-[10px] text-[var(--fontcolor-side)] py-1 cursor-pointer hover:bg-[var(--fontcolor-side)] hover:rounded-[5px] hover:text-[var(--bgc-sidenav)] hover:side-nav-button" onClick={handleLogout}>
                <i className="text-[30px] ml-2"><IoLogOut /></i>
                <button className={`border-0 font-semibold bg-transparent text-[16px] text-[var(--fontcolor-side)] side-nav-button hover:rounded-[5px] group-hover:text-[var(--bgc-sidenav)] hover:bg-[var(--fontcolor-side)] ${isSideNavMinimized ? "hidden" : ""}`}>
                ログアウト
                </button>
              </div>
            </div>

          </div>

          <main className={`mt-[10vh] mr-0 mb-[20px] ${isSideNavMinimized ? "ml-[70px] w-[calc(100vw - 70px)]" : "ml-[250px] w-[calc(100vw - 250px)]"}`}>
            {children}
          </main>
          
        </div>
      </>
    );
  };
  
  export default SideNavigation;