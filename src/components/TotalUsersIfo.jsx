import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
// import axios from "axios";

const UserInfoModal = ({ isOpen, onClose}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl">
        <div className="bg-[var(--bgc-sidenav)] p-6 rounded-sm w-2/3 h-[60vh]">
          <div className="flex justify-between items-center mb-4 text-white">
            <div>
              <h1 className="text-4xl"> Lory
                {/* {user?.displayName} */}
                </h1>
              <h3> 1111
                {/* {user?.userId} */}
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
                      <td className="border">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, est.</td>
                      <td className="border">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, iusto?</td>
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
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openUserInfoModal = () => {
    // setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeUserInfoModal = () => {
    setIsModalOpen(false);
    // setSelectedUser(null);
  };

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('https://reuvindevs.com/liff/public/api/answers/12321321321');
//       console.log(response.data)
//       setUsers(response.data)

//       console.log("Fetched Users:", response.data);
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchUser()
//   }, [])

  return (
    <>
      <h1 className="font-semibold ml-5 mb-5 text-lg sm:text-xl md:text-2xl sm:w-11/20">ユーザー管理</h1>

      <div className="mx-1 rounded-md sm:w-11/20 md:w-1/2 lg:w-full xl:w-full">
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="検索"
              className="text-base p-3 w-[400px] rounded border border-[var(--fontcolor-header)]"
            />
            <i className="absolute text-lg sm:text-xl md:text-2xl py-2 px-3 right-1">
              <FaSearch />
            </i>
          </div>
        </div>

        <div className="w-full p-5 overflow-auto shadow-sm lg:w-full">
          <table className="border-collapse lg:w-full">
            <thead>
              <tr>
                <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">ユーザーID</th>
                <th className="border border-[var(--fontcolor-header)] p-2 text-black text-start lg:w-[300px]">表示名</th>
              </tr>
            </thead>

            <tbody>
            
               
                  <tr
                  onClick={openUserInfoModal}
                    className="cursor-pointer hover:bg-[var(--fontcolor-header)] hover:text-white">
                    <td className="border border-[var(--fontcolor-header)] p-2">1111</td>
                    <td className="border border-[var(--fontcolor-header)] p-2">Lory</td>
                  </tr>
              
            </tbody>
          </table>
        </div>
      </div>

      <UserInfoModal
        isOpen={isModalOpen}
        onClose={closeUserInfoModal}
        
      />
    </>
  );
};

export default TotalUsersInfo;
