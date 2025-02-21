import { FaBars } from "react-icons/fa";

const Header = ({ toggleSideNav, isSideNavMinimized }) => {
  return (
    <>
      <header className="absolute shadow-2xl w-full z-10">
        <div >
        <div
          className={`flex justify-between items-center py-0 px-4 h-[8vh] ${isSideNavMinimized ? "xl:ml-[70px] lg:ml-[70px] md:ml-3 sm:ml-1" : "xl:ml-[250px] lg:ml-[250px] md:ml-[70px] sm:ml-[70px]"}`}
        >
          <div className="flex items-center gap-10">
            <i className="text-gray-500 text-lg cursor-pointer" onClick={toggleSideNav}>
              <FaBars />
            </i>

            <h4 className="text-[var(--fontcolor-header)] font-bold text-base">
              MIRABO
            </h4>
          </div>
        </div>
        </div>
      </header>
    </>
  );
};

export default Header;