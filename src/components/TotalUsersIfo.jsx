import { useState, useEffect } from "react";
import { FaDownload, FaSearch } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import axios from "axios";

const UserInfoModal = ({ isOpen, onClose, user}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl">
        <div className="bg-[var(--bgc-sidenav)] p-6 rounded-sm w-2/3 h-[60vh]">
          <div className="flex justify-between items-center mb-4 text-white">
            <div>
              <h1 className="text-4xl">
                {user?.displayName}
                </h1>
              <h3>
                {user?.userId}
                </h3>
            </div>
            <i className="text-white text-3xl mr-4"><TiUserDelete /></i>
          </div>

          <div className="mb-4 text-white overflow-y-scroll max-h-[330px]">
            <table className="border">
              <thead>
                <tr>
                  <th className="border w-[300px]">Questions</th>
                  <th className="border w-[700px]">Answers</th>
                </tr>
              </thead>
              <tbody>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_1}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_2}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_3}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_4}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_5}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_6}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_7}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_8}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_9}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_10}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_11}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_12}</td>
                    </tr>
                    <tr>
                      <td className="border"></td>
                      <td className="border">{user?.Question_13}</td>
                    </tr>
                   
               
              </tbody>
            </table>
          </div>

          <div>
            <button className="rounded bg-white p-3 cursor-pointer hover:bg-[var(--fontcolor-header)] hover:text-white" onClick={onClose}>
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
  const usersPerPage = 10;
 
  

  const openUserInfoModal = (user) => {
    setIsModalOpen(true);
    setSelectedObject(user);
    
  };

  console.log(selectedObject);

  const closeUserInfoModal = () => {
    setIsModalOpen(false);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/answers');
      setUsers(response.data.data.answers);
      console.log("Fetched Users:", response.data.data.answers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  }

  const filterUser = users.filter((user) => {
    return(
      (user.displayName.toLowerCase().includes(searchQuery)) ||
      (user.userId.toLowerCase().includes(searchQuery))
    )}); 


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentFilteredUsers = filterUser.slice(indexOfFirstUser, indexOfLastUser);

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

  console.log(users);

  return (
    <>
      <h1 className="font-semibold ml-5 mb-5 text-lg sm:text-xl md:text-2xl sm:w-11/20">ユーザー管理</h1>

      <div className=" ml-10 rounded-md sm:w-3/7 md:w-1/2 lg:w-full xl:w-[calc(100vw-400px)]">
        <div className=" mx-auto p-5">
          <div className="relative">
            <input
              type="text"
              placeholder="検索"
              className="text-base p-3 w-[400px] rounded border border-[var(--fontcolor-header)]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="absolute text-lg sm:text-xl md:text-2xl py-2 px-3 sm:left-0 md:left-85 lg:left-85 top-1">
              <FaSearch />
            </i>
          </div>
        </div>

        <div className="w-full py-5 px-1 overflow-auto shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">ユーザーID</th>
                <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">表示名</th>
                <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[100px]">アクション</th>
              </tr>
            </thead>

            <tbody>
              {currentFilteredUsers.map((user) => (
                  <tr
                  key={user.id}
                  onClick={() => openUserInfoModal(user)}
                  className="group cursor-pointer">
                    <td className="border border-[var(--fontcolor-header)] p-2 group-hover:bg-[var(--fontcolor-header)] group-hover:text-white">{user.userId}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2 group-hover:bg-[var(--fontcolor-header)] group-hover:text-white">{user.displayName}</td>
                    <td className="border border-[var(--fontcolor-header)] p-2 hover:text-[var(--fontcolor-header)]"><i className="flex justify-center items-center"><FaDownload/></i></td>
                    
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

              <div className="text-sm text-[var(--bgc-sidenav)] text-center">
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

      <UserInfoModal
        isOpen={isModalOpen}
        onClose={closeUserInfoModal}
        user={selectedObject}
      />
    </>
  );
};

export default TotalUsersInfo;
