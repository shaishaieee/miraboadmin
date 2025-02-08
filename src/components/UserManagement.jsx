import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { LuArrowDownUp } from "react-icons/lu";
import { TiUserDelete } from "react-icons/ti";

const UserModal = ({ isOpen, onClose, user, onSave, firstName, setFirstName, lastName, setLastName, email, setEmail, role, setRole, password, setPassword }) => {
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setPassword(user.password || "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setPassword("");
    }
  }, [user, setFirstName, setLastName, setEmail, setRole, setPassword]);

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !role || !password) {
      alert("全てのフィールドを入力してください");
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: role,
      password: password,
    };
    onSave(newUser);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl">
        <div className="bg-[var(--bgc-sidenav)] p-6 rounded-sm w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-white">
            {user ? "情報の編集" : "ユーザーの追加"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="firstName">
              名
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
              姓
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
              メールアドレス
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
              権限
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full text-white border border-gray-300 rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="password">
              パスワード
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
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              className="text-[var(--bgc-sidenav)] bg-white p-2 rounded-sm text-[12px] font-semibold w-20 hover:bg-gray-300"
            >
              {user ? "編集" : "追加"} ユーザー
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
  const [users, setUsers] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastNameSortConfig, setLastNameSortConfig] = useState({
    direction: "ascending"
  });
  const [dateSortConfig, setDateSortConfig] = useState({
    direction: "descending"
  });

  const openAddUserModal = () => {
    setUser(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('');
    setPassword('');
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setPassword("");
  };

  const openEditModal = (user) => {
    setUser(user);
    setIsModalOpen(true);
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/users');
      console.log(response.data)
      setUsers(response.data)

      console.log("Fetched Users:", response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [reloadKey])

  const handleSave = async (newUser) => {
    console.log("Saving user:", newUser);
    try {
      if (user) {
        await axios.put(`https://reuvindevs.com/liff/public/api/v1/users/${user.id}`, newUser);
        setUsers(users.map((u) => (u.email === user.email ? { ...u, ...newUser } : u)));
      } else {
        const response = await axios.post(`https://reuvindevs.com/liff/public/api/v1/users`, newUser);
        setUsers([...users, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleDelete = async (user) => {
    try {
      await axios.delete(`https://reuvindevs.com/liff/public/api/v1/users/${user.id}`);
      console.log(user.id);
      setUsers(users.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSortLastName = () => {
    const direction = lastNameSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers = [...users].sort((a, b) =>
      direction === "ascending" ? a.lastName.localeCompare(b.lastName) : b.lastName.localeCompare(a.lastName)
    );
    setUsers(sortUsers);
    setLastNameSortConfig({ direction });
  };

  const handleSortDate = () => {
    const direction = dateSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers = [...users].sort((a, b) =>
      direction === "ascending" ? new Date(a.dateCreated) - new Date(b.dateCreated) : new Date(b.dateCreated) - new Date(a.dateCreated)
    );
    setUsers(sortUsers);
    setDateSortConfig({ direction });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviosPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterUsers = users.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(searchQuery) ||
      user.last_name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  });

  const currentFilteredUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <div>
        <h1 className="font-semibold ml-5 mb-5 text-lg sm:text-xl md:text-2xl">ユーザー管理</h1>

        <div className="mx-1 sm:mx-10 md:mx-1 w-full shadow-2xl rounded-md">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="検索"
                className="text-base sm:text-lg md:text-xl w-48 sm:w-64 md:w-80 p-2 rounded-l-md border border-[var(--fontcolor-header)]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="text-lg sm:text-xl md:text-2xl py-2 px-3 border-[var(--fontcolor-header)] border-b border-r border-t rounded-r-md">
                <FaSearch />
              </i>
            </div>
            <i className="text-[var(--bgc-sidenav)] text-2xl sm:text-3xl md:text-4xl mr-5 hover:text-[var(--fontcolor-header)] cursor-pointer" onClick={openAddUserModal}>
              <HiUserAdd />
            </i>
          </div>

          <div className="w-full p-5 overflow-auto" style={{ maxHeight: '600px' }}>
            <table className="border-collapse w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start w-40">
                    姓
                    <i className="ml-2" onClick={handleSortLastName}>
                      <LuArrowDownUp />
                    </i>
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start w-40">
                    名
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start w-52">
                    作成日
                    <i onClick={handleSortDate}>
                      <LuArrowDownUp />
                    </i>
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start w-52">メールアドレス</th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start w-40">権限</th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start w-24">アクション</th>
                </tr>
              </thead>

              <tbody>
                {currentFilteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-[var(--fontcolor-header)] p-2">{user.last_name}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2">{user.first_name}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2">{user.created_at}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2">{user.email}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2">{user.role}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2">
                      <div className="flex justify-center gap-2">
                        <i className="text-xl text-[var(--bgc-sidenav)] cursor-pointer hover:text-[var(--fontcolor-header)]" onClick={() => openEditModal(user)}>
                          <FaUserEdit />
                        </i>
                        <i className="text-xl text-[var(--bgc-sidenav)] cursor-pointer hover:text-[var(--fontcolor-header)]" onClick={() => handleDelete(user)}>
                          <TiUserDelete />
                        </i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4 p-5">
            <button
              className="px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400 cursor-pointer"
              onClick={handlePreviosPage}
              disabled={currentPage === 1}
            >
              前のページ
            </button>

            <div className="text-sm text-[var(--bgc-sidenav)]">
              Page {currentPage} of {totalPages}
            </div>

            <button
              className="px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400 cursor-pointer"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              次のページ
            </button>
          </div>
        </div>

        <UserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={user}
          onSave={handleSave}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </>
  );
};

export default UserManagement;