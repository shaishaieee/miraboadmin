import { Outlet, useLocation } from "react-router-dom";
import SideNavigation from "./SideNavigation";  

const Layout = () => {
  const location = useLocation();

 
  const isAuthPage = location.pathname === "/login" || location.pathname === "/forgetpassword" || location.pathname ==="/newpassword";


  return (
    <>
      {isAuthPage ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <SideNavigation>
          <main>
            <Outlet />
          </main>
        </SideNavigation>
      )}
    </>
  );
};

export default Layout;
