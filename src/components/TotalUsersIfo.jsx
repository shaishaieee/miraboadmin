import { useState, useEffect } from "react";
import { FaDownload, FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const UserInfoModal = ({ isOpen, onClose, user, onDelete }) => {
  const [questions, setQuestions] = useState([]);
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
    }
  };

  const handleDelete = () => {
    onDelete(user?.id);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl ">
        <div className="bg-[var(--bgc-sidenav)] p-6 rounded-sm w-2/3 h-[65vh] overflow-x-auto">
          <div className="flex justify-between items-center mb-4 text-white">
            <div>
              <h1 className="text-4xl">{user?.displayName}</h1>
              <h3>{user?.userId}</h3>
            </div>
            <div className="flex items-center gap-5">
              <i
                className="text-white text-xl mr-4 cursor-pointer"
                onClick={handleDelete}
              >
                <FaTrashCan />
              </i>
              <i
                className="text-white text-xl mr-4 cursor-pointer"
                onClick={() => handleExport(user?.userId)}
              >
                <FaDownload />
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
      <div className="h-screen overflow-y-auto my-10">
        <h1 className="font-semibold ml-5 mb-5 text-lg sm:text-xl md:text-2xl sm:w-11/20">
          合計ユーザー情報
        </h1>
        <div className="flex justify-center items-center gap-4">
          <div className="ml-10 rounded-md sm:min-w-2/4 md:min-w-1/2 lg:min-w-full xl:min-w-full">
            <div className="mx-auto p-5">
              <div className="flex items-center relative">
                <input
                  type="text"
                  placeholder="検索"
                  className="text-base p-3 w-[400px] rounded border border-[var(--fontcolor-header)]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <i className="absolute text-lg sm:text-xl md:text-2xl py-2 px-3 left-[350px]">
                  <FaSearch />
                </i>
              </div>
            </div>

            <div className="flex justify-center w-[calc(100vw-300px)] mr[10px]">
              <div className="w-full py-5 px-1 overflow-auto min-h-[500px] shadow-sm">
                {loading ? (
                  <div className="flex flex-col justify-center items-center gap-4 min-h-[500px]">
                    <div className="loader"></div>
                    <div>Loading...</div>
                  </div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">
                          ユーザーID
                        </th>
                        <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">
                          表示名
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentFilteredUsers.length > 0 ? (
                        currentFilteredUsers.map((user) => (
                          <tr
                            key={user.id}
                            onClick={() => openUserInfoModal(user)}
                            className="group cursor-pointer"
                          >
                            <td className="border border-[var(--fontcolor-header)] p-2 group-hover:bg-[var(--fontcolor-header)] group-hover:text-white">
                              {user.userId}
                            </td>
                            <td className="border border-[var(--fontcolor-header)] p-2 group-hover:bg-[var(--fontcolor-header)] group-hover:text-white">
                              {user.displayName}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="border border-[var(--fontcolor-header)] p-2 text-center"
                            colSpan="2"
                          >
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
              <div className="flex justify-between mt-4 mb-20 p-5">
                <button
                  className={`flex justify-start px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400 cursor-pointer ${
                    currentPage === 1 ? "invisible" : "visible"
                  }`}
                  onClick={handlePreviosPage}
                >
                  前のページ
                </button>

                <div className="flex justify-center text-sm text-[var(--bgc-sidenav)]">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  className={`flex justify-end px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400 cursor-pointer ${
                    currentPage === totalPages ? "invisible" : "visible"
                  }`}
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