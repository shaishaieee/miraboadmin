import { FaBars } from "react-icons/fa";

const Header = ({ toggleSideNav, toggleMobileNav }) => {
  return (
    <header className="bg-white shadow-md h-[8vh] flex items-center px-4 fixed top-0 w-full z-40">
      <div className="flex items-center gap-4">
        
        <button className="sm:block md:hidden text-gray-700 text-xl ml-5" onClick={toggleMobileNav}>
          <FaBars />
        </button>

        
        <button className="hidden md:block text-gray-700 text-xl" onClick={toggleSideNav}>
          <FaBars />
        </button>

        <h4 className="text-gray-700 font-bold text-lg">MIRABO</h4>
      </div>
    </header>
  );
};

export default Header;
