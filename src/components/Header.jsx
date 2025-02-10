import { FaBars } from "react-icons/fa";

const Header = ({ toggleSideNav, isSideNavMinimized }) => {
  return (
    <>
      <header className="absolute shadow-2xl w-full z-10">
        <div
          className={`flex justify-between items-center py-0 px-4 h-[8vh] ${isSideNavMinimized ? "ml-[70px]" : "ml-[250px]"} sm:px-6 md:px-8`}
        >
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <i className="text-[var(--fontcolor-header)] text-lg sm:text-xl md:text-2xl cursor-pointer" onClick={toggleSideNav}>
              <FaBars />
            </i>

            <h4 className="text-[var(--fontcolor-header)] font-bold text-base sm:text-lg md:text-xl">
              MIRABO
            </h4>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;