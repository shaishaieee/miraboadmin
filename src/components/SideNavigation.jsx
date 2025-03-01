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
    { path: "/usermanagement", name: "管理ユーザー情報", icon: <FaUsers /> },
    {
      path: "/totalusersinfo",
      name: "合計ユーザー情報",
      icon: <FaUsersLine />,
    },
    { path: "/userprofile", name: "ユーザープロフィール", icon: <FaUser /> },
    {
      path: "/csvexcelupload",
      name: "CSV/Excelアップロード",
      icon: <FaUpload />,
    },
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
      <Header
        toggleSideNav={toggleSideNav}
        isSideNavMinimized={isSideNavMinimized}
      />
      <div className=" fixed ">
        <div
          className={`absolute bg-[var(--bgc-sidenav)] h-screen shadow-2xl ${
            isSideNavMinimized
              ? "xl:w-[70px] lg:w-[70px] md:w-0 sm:w-0 xs:w-0"
              : "xl:w-[250px] lg:w-[250px] md:w-[70px] sm:w-[70px] xs:w-[70px]"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex justify-start items-center gap-[10px] px-[10px] py-[10px] border-b border-[#c2c7d039]">
            <img
              className="w-[40px] h-[40px] cursor-pointer bg-white rounded-full shadow-2xl"
              src={Logo}
              alt="Logo"
            />
            <h2
              className={`font-light text-[var(--fontcolor-side)] text-[18px] cursor-pointer hover:text-white ${
                isSideNavMinimized
                  ? "xl:hidden lg:hidden md:hidden sm:hidden xs:hidden"
                  : "xs:hidden sm:hidden md:hidden lg:block xl:block"
              }`}
            >
              Admin MIRABO
            </h2>
          </div>

          <div className="mt-[30px]">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="flex items-center font-semibold gap-[20px] m-[10px] text-[var(--fontcolor-side)] py-[5px] px[10px] hover:bg-[var(--fontcolor-side)] hover:text-[var(--bgc-sidenav)] rounded-[5px]"
              >
                <div
                  className={`text-[26px] ml-2 ${
                    isSideNavMinimized
                      ? "lg:flex xl:flex md:hidden sm:hidden"
                      : "sm:flex md:flex lg:flex xl:flex"
                  }`}
                >
                  {item.icon}
                </div>
                <div
                  className={`text-[16px] ${
                    isSideNavMinimized
                      ? "hidden"
                      : "sm:hidden md:hidden lg:block xl:block"
                  }`}
                >
                  {item.name}
                </div>
              </NavLink>
            ))}

            <div
              className={`group flex gap-[20px] items-center my-0 mx-[10px] text-[var(--fontcolor-side)] py-1 hover:bg-[var(--fontcolor-side)] hover:rounded-[5px] hover:text-[var(--bgc-sidenav)] hover:side-nav-button cursor-pointer ${
                isSideNavMinimized
                  ? "sm:hidden md:hidden lg:flex xl:flex"
                  : "sm:flex md:flex lg:flex xl:flex"
              }`}
              onClick={handleLogout}
            >
              <i className="text-[30px] ml-2">
                <IoLogOut />
              </i>
              <button
                className={`border-0 font-semibold bg-transparent text-[16px] text-[var(--fontcolor-side)] side-nav-button hover:rounded-[5px] group-hover:text-[var(--bgc-sidenav)] hover:bg-[var(--fontcolor-side)] ${
                  isSideNavMinimized
                    ? "hidden"
                    : "sm:hidden md:hidden lg:block xl:block"
                }`}
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>

        <main
          className={`mt-[10vh] mx-auto mb-[20px] ${
            isSideNavMinimized
              ? "xl:ml-[70px] xl:w-[calc(100vw - 70px)] lg:ml-[70px] lg:w-[calc(100vw - 70px)] md:ml-[10px] md:w-[calc(100vw - 10px)] sm:ml-[10px] sm:w-[calc(100vw - 10px)]"
              : "xl:ml-[250px] xl:w-[calc(100vw - 250px)] lg:ml-[250px] lg:w-[calc(100vw - 250px)] md:ml-[70px] md:w-[calc(100vw - 70px)] sm:ml-[70px] sm:w-[calc(100vw - 70px)]"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default SideNavigation;
