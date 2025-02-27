import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { LuArrowDownUp } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = ({ isOpen, onClose, user, onSave, firstName, setFirstName, lastName, setLastName, email, setEmail, role, setRole, password, setPassword }) => {
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setPassword("");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setPassword("");
    }
  }, [user, setFirstName, setLastName, setEmail, setRole, setPassword]);

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !role || (!user && !password)) {
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
          {!user && (
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
          )}

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray p-2 rounded-sm hover:bg-gray-400 text-[12px] font-semibold w-20 cursor-pointer"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              className="text-[var(--bgc-sidenav)] bg-white p-2 rounded-sm text-[12px] font-semibold w-20 hover:bg-gray-300 cursor-pointer"
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
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastNameSortConfig, setLastNameSortConfig] = useState({
    direction: "ascending"
  });
  const [dateSortConfig, setDateSortConfig] = useState({
    direction: "descending"
  });
  const [firstNameSortConfig, setFirstNameSortConfig] = useState({
    direction: "ascending"
  });
  const [emailSortConfig, setEmailSortConfig] = useState({
    direction: "ascending"
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
    setFirstName(user.first_name || "");
    setLastName(user.last_name || "");
    setEmail(user.email || "");
    setRole(user.role || "");
    setPassword(""); 
    setIsModalOpen(true);
  }

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUsers(response.data);

      console.log("Fetched Users:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  console.log(questions)
  useEffect(() => {
    fetchUser()
  }, [reloadKey])
  

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSave = async (newUser) => {
    console.log("Saving user:", newUser);
    try {
      const token = localStorage.getItem("token");
      if (user) {
        await axios.put(`${apiUrl}/v1/users/${user.id}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.map((u) => (u.email === user.email ? { ...u, ...newUser } : u)));
        toast.success("ユーザーが正常に更新されました");
      } else {
        const response = await axios.post(`${apiUrl}/v1/users`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers([...users, response.data]);
        toast.success("ユーザーが正常に追加されました");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleDelete = async (user) => {
    try {
      const confirmed = window.confirm("削除しますか?");
      if (confirmed){
        const token = localStorage.getItem("token");
        await axios.delete(`${apiUrl}/v1/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(user.id);
        setUsers(users.filter((u) => u.id !== user.id));
        toast.success("ユーザーが正常に削除されました");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSortLastName = () => {
    const direction = lastNameSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers = [...users].sort((a, b) => {
      const lastNameA = a.last_name || "";
      const lastNameB = b.last_name || "";
      return direction === "ascending" ? lastNameA.localeCompare(lastNameB) : lastNameB.localeCompare(lastNameA);
    });
    setUsers(sortUsers);
    setLastNameSortConfig({ direction });
  };

  const handleSortDate = () => {
    const direction = dateSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers = [...users].sort((a, b) =>
      direction === "ascending" ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at)
    );
    setUsers(sortUsers);
    setDateSortConfig({ direction });
  };

  const handleSortFirstName = () => {
    const direction = firstNameSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers = [...users].sort((a, b) => {
      const firstNameA = a.first_name || "";
      const firstNameB = b.first_name || "";
      return direction === "ascending" ? firstNameA.localeCompare(firstNameB) : firstNameB.localeCompare(firstNameA);
    });
    setUsers(sortUsers);
    setFirstNameSortConfig({ direction });
  };

  const handleSortEmail = () => {
    const direction = emailSortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortUsers = [...users].sort((a, b) => {
      const emailA = a.email || "";
      const emailB = b.email || "";
      return direction === "ascending" ? emailA.localeCompare(emailB) : emailB.localeCompare(emailA);
    });
    setUsers(sortUsers);
    setEmailSortConfig({ direction });
  };

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
      (user.first_name && user.first_name.toLowerCase().includes(searchQuery)) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchQuery)) ||
      (user.email && user.email.toLowerCase().includes(searchQuery))
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(filterUsers.length / usersPerPage);
  const currentFilteredUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);

  

  return (
    <div className="h-screen overflow-y-auto my-10">
      <div>
      <ToastContainer />
        <h1 className="font-semibold ml-5 mb-5 text-lg sm:text-xl md:text-2xl sm:w-11/20">ユーザー管理</h1>
        <div className="flex justify-center w-[calc(100vw-300px)]">
        <div className="mx-1 rounded-md sm:min-w-2/4 md:min-w-1/2 lg:max-w-full xl:min-w-full mb-[100px]">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="検索"
                className="text-base p-3 w-[400px] rounded border border-[var(--fontcolor-header)]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="absolute text-lg sm:text-xl md:text-2xl py-2 px-3 right-1">
                <FaSearch />
              </i>
            </div>
            <i className="text-[var(--bgc-sidenav)] text-2xl sm:text-3xl md:text-4xl mr-5 hover:text-[var(--fontcolor-header)] cursor-pointer" onClick={openAddUserModal}>
              <HiUserAdd />
            </i>
          </div>

          <div className="w-full p-5 overflow-auto min-h-[500px] shadow-sm sm:min-w-[100px] md:min-w-[900px] lg:min-w-full">
            {loading ? (
              <div className=" flex flex-col justify-center items-center gap-4 min-h-[500px]">
                <div className="loader"></div>
                <div>Loading...</div>
              </div>
            ) : (
              <table className="border-collapse lg:w-full">
              <thead>
                <tr>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[250px]"> 
                    <div className="flex items-center gap-5">
                    姓
                    <i className="ml-2 cursor-pointer hover:text-gray-500" onClick={handleSortLastName}>
                      <LuArrowDownUp />
                    </i>
                    </div>
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[250px]">
                  <div className="flex items-center gap-5">
                    名
                    <i className="ml-2 cursor-pointer hover:text-gray-500" onClick={handleSortFirstName}>
                      <LuArrowDownUp />
                    </i>
                    </div>
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[250px]">
                    <div className="flex items-center gap-5">
                    作成日
                    <i className="cursor-pointer hover:text-gray-500" onClick={handleSortDate}>
                      <LuArrowDownUp />
                    </i>
                    </div>
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">
                  <div className="flex items-center gap-5">
                    メールアドレス
                    <i className="ml-2 cursor-pointer hover:text-gray-500" onClick={handleSortEmail}>
                      <LuArrowDownUp />
                    </i>
                    </div>
                  </th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[100px]">権限</th>
                  <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[100px]">アクション</th>
                </tr>
              </thead>

              <tbody>
                {currentFilteredUsers.length > 0 ? (
                  currentFilteredUsers.map((user) => (
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
                            <FaTrashCan />
                          </i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                  <td colSpan="6" className="border border-[var(--fontcolor-header)] p-2 text-center">
                    No data Found
                  </td>
                </tr>
                )}
              </tbody>
            </table>
            )}
            
          </div>

          {filterUsers.length > usersPerPage && (
            <div className="flex justify-between mt-4 p-5 mb-20 ">
              <button
                className={`flex justify-start px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400 cursor-pointer ${currentPage === 1 ? 'invisible' : 'visible'}`}
                onClick={handlePreviosPage}
              >
                前のページ
              </button>

              <div className="flex justify-center text-sm text-[var(--bgc-sidenav)]">
                Page {currentPage} of {totalPages}
              </div>

              <button
                className={`flex justify-end px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400 cursor-pointer ${currentPage === totalPages ? 'invisible' : 'visible'}`}
                onClick={handleNextPage}
              >
                次のページ
              </button>
            </div>
          )}
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
    </div>
  );
};

export default UserManagement;