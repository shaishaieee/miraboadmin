import { FaBars } from "react-icons/fa";

const Header = ({ toggleSideNav, isSideNavMinimized }) => {
    return (
      <>
        <header className="absolute w-full shadow-2xl">
          <div
            className={`flex justify-between items-center py-0 px-[20px] h-[8vh] ${isSideNavMinimized ? " ml-[70px]" : "ml-[250px]"}`}
          >
            <div className="flex items-center gap-[30px]">
              <i className="text-[var(--fontcolor-header)]" onClick={toggleSideNav}>
                <FaBars />
              </i>
  
              <h4 className="text-[var(--fontcolor-header)] font-bold
              ">MIRABO</h4>
            </div>
          </div>
        </header>
      </>
    );
  };
  
  export default Header;