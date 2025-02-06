
import { useEffect, useState } from "react";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { LuArrowDownUp } from "react-icons/lu";
import { TiUserDelete } from "react-icons/ti";


const UserModal = ({ isOpen, onClose, user, onSave }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [password, setPassword] = useState(user?.password || "");

  useEffect(() => {
    if (user){
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
      setPassword(user.password);
    } else{
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setPassword("");
    }
  }, [user]);

  const handleSubmit = () => {
    const newUser = { firstName, lastName, email, role };
    onSave(newUser);
    onClose(); 
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl">
        <div className="bg-[var(--bgc-sidenav)] p-6 rounded-sm w-96">
          <h2 className="text-xl font-bold mb-4 text-white">
            {user ? "Edit Info" : "Add User"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border text-white border-gray-300 rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full text-white border border-gray-300 rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full text-white border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full text-white border border-gray-300 rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="role">
              Password
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full text-white border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray p-2 rounded-sm hover:bg-gray-400 text-[12px] font-semibold w-20"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="text-[var(--bgc-sidenav)] bg-white p-2 rounded-sm text-[12px] font-semibold w-20 hover:bg-gray-300"
            >
              {user ? "Edit" : "Add"} User
            </button>
          </div>
        </div>
      </div>
    )
  );
};


const UserManagement = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {firstName: "Shai Mae", lastName: "Lopez", email: "shaira@test.com", role: "Admin", dateCreated: "2025-01-01", password: "1234"},
    {firstName: "Shai Mae", lastName: "Zai", email: "shai@test.com", role: "Admin", dateCreated: "2025-02-01", password: "12345"},
    {firstName: "Shai Mae", lastName: "Sia", email: "shair@test.com", role: "Admin", dateCreated: "2025-01-25", password: "123456"},
    {firstName: "Shai Mae", lastName: "Que", email: "sha@test.com", role: "Admin", dateCreated: "2025-02-27", password: "1234567"}
  ]);
  const [lastNameSortConfig, setLastNameSortConfig] = useState({
    direction: "ascending"
  });
  const [dateSortConfig, setDateSortConfig] = useState({
    direction: "descending"
  });

  const openAddUserModal = () =>{
    setUser(null);
    setIsModalOpen(true);
  }

  const openEditModal = (user) =>{
    setUser(user);
    setIsModalOpen(true);
  }

  const handleSave = (newUser) => {
    if (user){
      const updateUsers = users.map((u) => u.email === user.email ? newUser : u);
      setUsers(updateUsers);
    } else {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = email => {
    setUsers((prevUsers) => prevUsers.filter((user)=> user.email !== email));
  };

  const handleSortLastName = () => {
    const direction = lastNameSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers =[...users].sort((a,b) => 
    direction === "ascending" ? a.lastName.localeCompare(b.lastName) : b.lastName.localeCompare(a.lastName)
  );
  setUsers(sortUsers);
  setLastNameSortConfig({direction});
  };

  const handleSortDate = () => {
    const direction = dateSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers =[...users].sort((a,b) => 
    direction === "ascending" ? new Date(a.dateCreated) - new Date(b.dateCreated) : new Date(b.dateCreated) - new Date(a.dateCreated)
  );
  setUsers(sortUsers);
  setDateSortConfig({direction});
  };

    return (
      <>
      
        <div>
          <h1 className="font-semibold ml-[20px] mb-5">ユーザー管理</h1>
          
            <div className=" mx-[20px] shadow-2xl rounded-[5px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center m-[30px]">
                  <input type="text" placeholder="検索" className="text-[16px] w-[300px] p-[7px] rounded-tl-[5px] rounded-bl-[5px] border border-[var(--fontcolor-header)]"/>
                  <i className="text-[20px] py-[9px] px-[10px] border-[var(--fontcolor-header)] border-b border-r border-t rounded-tr-[5px] rounded-br-[5px]">
                    <FaSearch />
                  </i>
                </div>
                  <i className="text-[var(--bgc-sidenav)] text-[30px] mr-5 hover:text-[var(--fontcolor-header)] cursor-pointer" onClick={openAddUserModal}>
                    <HiUserAdd />
                  </i>
              </div>
    
              <div className="w-full p-[25px]">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className=" 
                      border border-[var(--fontcolor-header)] p-[10px] text-black text-start max-w-[200px]">
                      Last Name
                        <i className="ml-[10px]" onClick={handleSortLastName}>
                          <LuArrowDownUp />
                        </i>
                      </th>
                      <th className=" 
                      border border-[var(--fontcolor-header)] p-[10px] text-black text-start min-w-[200px]">
                      First Name
                      </th>
                      <th className="
                      border border-[var(--fontcolor-header)] p-[10px] text-black text-start min-w-[210px]">
                        作成日
                        <i onClick={handleSortDate}>
                          <LuArrowDownUp />
                        </i>
                      </th>
                      <th className="border border-[var(--fontcolor-header)] p-[10px] text-black text-start max-w-[150px]">Email</th>
                      <th className="border border-[var(--fontcolor-header)] p-[10px] text-black text-start w-[150px]">役割</th>
                      <th className="border border-[var(--fontcolor-header)] p-[10px] text-black text-start w-[100px]">アクション</th>
                    </tr>
                  </thead>
    
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.email}>
                      <td className="border border-[var(--fontcolor-header)] p-[10px] h-[20px]">{user.lastName}</td>
                      <td className="border border-[var(--fontcolor-header)] p-[10px] h-[20px]">{user.firstName}</td>
                      <td className="border border-[var(--fontcolor-header)] p-[10px] h-[20px]">{user.dateCreated}</td>
                      <td className="border border-[var(--fontcolor-header)] p-[10px] h-[20px]">{user.email}</td>
                      <td className="border border-[var(--fontcolor-header)] p-[10px] h-[20px]">{user.role}</td>
                      <td className="border border-[var(--fontcolor-header)] p-[10px] h-[20px]">
                        <div className="flex justify-center gap-5">
                          <i className="text-2xl text-[var(--bgc-sidenav)] cursor-pointer hover:text-[var(--fontcolor-header)]" onClick={() => openEditModal(user)}>
                            <FaUserEdit />
                          </i>
                          <i className="text-2xl text-[var(--bgc-sidenav)] cursor-pointer hover:text-[var(--fontcolor-header)]" 
                          onClick={() => handleDelete(user.email)}>
                            <TiUserDelete />
                          </i>
                        </div>
                      </td>
                    </tr>
                    ))}
    
                  </tbody>
                </table>
              </div>
            </div>
          
          <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onSave={handleSave} />
        </div>
      </>
    );
  };
  
  export default UserManagement;