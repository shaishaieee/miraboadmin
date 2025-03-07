import { useState, useEffect } from "react";
import { FaDownload, FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const UserInfoModal = ({ isOpen, onClose, user, onDelete }) => {
  const [questions, setQuestions] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/questions`);
      console.log(response.data.questions);
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleExport = async (id) => {
    setLoadingPdf(true); 
    try {
      const response = await axios.get(`${apiUrl}/export-answers/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user_${id}_answers.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("正常にダウンロードされました");
      console.log("This is the output" + id);
    } catch (error) {
      console.error("Export Error:", error);
      toast.warning("ユーザーの回答をエクスポートできませんでした");
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDelete = () => {
    onDelete(user?.id);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl ">
        <div className="bg-[var(--bgc-sidenav)] p-6 rounded-sm w-full max-w-md">
          <div className="flex justify-between items-center mb-4 text-white">
            <div>
              <h1 className="text-4xl">{user?.displayName}</h1>
              <h3>{user?.userId}</h3>
            </div>
            <div className="flex items-center gap-0.5">
              <i
                className="text-white text-xl mr-4 cursor-pointer"
                onClick={handleDelete}
              >
                <FaTrashCan />
              </i>
              <i
                className="text-white text-xl mr-4 ml-3 cursor-pointer"
                onClick={() => handleExport(user?.userId)}
              >
                {loadingPdf ? (
                  <div className="loader-small"></div> 
                ) : (
                  <FaDownload />
                )}
              </i>
            </div>
          </div>

          <div className="mb-4 text-white overflow-y-scroll max-h-[340px]">
            <table className="border">
              <thead>
                <tr>
                  <th className="border w-[40%]">Questions</th>
                  <th className="border w-[60%]">Answers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[0]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_1}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[1]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_2}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[2]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_3}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[3]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_4}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[4]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_5}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[5]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_6}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[6]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_7}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[7]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_8}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[8]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_9}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[9]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_10}
                  </td>
                </tr>
                <tr>
                  <td className="border px-5 py-2 text-center">
                    {questions[10]}
                  </td>
                  <td className="border px-5 py-2 text-center">
                    {user?.Question_11}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              className="rounded bg-white p-3 cursor-pointer hover:bg-gray-500 hover:text-white"
              onClick={onClose}
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const TotalUsersInfo = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const usersPerPage = 10;

  const apiUrl = import.meta.env.VITE_API_URL;

  const openUserInfoModal = (user) => {
    setIsModalOpen(true);
    setSelectedObject(user);
  };

  const closeUserInfoModal = () => {
    setIsModalOpen(false);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/answers`);
      const sortedUsers = response.data.data.answers.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setUsers(sortedUsers);
      console.log("Fetched Users:", sortedUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log("Triggered useEffect");
  }, [trigger]);

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("削除しますか?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/v1/delete-answer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("ユーザーが正常に削除されました");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      setIsModalOpen(false);
    } catch (error) {
      toast.warning("処理中にエラーが発生しました。もう一度試してください。");
      console.error("Error deleting user:", error);
    }
  };

  console.log("This is trigger" + trigger);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filterUser = users.filter((user) => {
    return (
      (user.displayName &&
        user.displayName.toLowerCase().includes(searchQuery)) ||
      (user.userId && user.userId.toLowerCase().includes(searchQuery))
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(filterUser.length / usersPerPage);
  const currentFilteredUsers = filterUser.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

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

  return (
    <div>
    <ToastContainer />
    <div className="h-screen overflow-y-auto my-10 md:ml-5 lg:ml-5 w-full max-w-5xl px-4 md:px-6 lg:px-8">
      <h1 className="font-semibold mb-5 text-lg sm:text-xl md:text-2xl w-full">
        合計ユーザー情報
      </h1>
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-4xl rounded-md">
          <div className="border-amber-600 w-full px-4">
            <div className="flex items-center relative w-full max-w-lg mx-auto">
              <input
                type="text"
                placeholder="検索"
                className="text-base p-3 w-full rounded border border-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="absolute right-4 text-lg">
                <FaSearch />
              </i>
            </div>
          </div>
  
          <div className="flex justify-center w-full overflow-x-auto mt-4">
            <div className="py-5 min-h-[300px] shadow-sm w-full">
              {loading ? (
                <div className="flex flex-col justify-center items-center gap-4 min-h-[300px]">
                  <div className="loader"></div>
                  <div>Loading...</div>
                </div>
              ) : (
                <table className="w-full border-collapse text-sm md:text-base">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2 text-start">ユーザーID</th>
                      <th className="border border-gray-400 p-2 text-start">表示名</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    {currentFilteredUsers.length > 0 ? (
                      currentFilteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          onClick={() => openUserInfoModal(user)}
                          className="group cursor-pointer hover:bg-gray-200"
                        >
                          <td className="border border-gray-400 p-2">{user.userId}</td>
                          <td className="border border-gray-400 p-2">{user.displayName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border border-gray-400 p-2 text-center" colSpan="2">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
  
          {filterUser.length > usersPerPage && (
            <div className="flex justify-between mt-4 mb-20 p-5 w-full">
              <button
                className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${currentPage === 1 ? "invisible" : "visible"}`}
                onClick={handlePreviosPage}
              >
                前のページ
              </button>
  
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
  
              <button
                className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${currentPage === totalPages ? "invisible" : "visible"}`}
                onClick={handleNextPage}
              >
                次のページ
              </button>
            </div>
          )}
        </div>
      </div>
  

        <UserInfoModal
          isOpen={isModalOpen}
          onClose={closeUserInfoModal}
          user={selectedObject}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
    
  );
};

export default TotalUsersInfo;