import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/context";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const context = useContext(UserContext);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if ( !newPassword || !confirmPassword) {
      console.log("Missing fields");
      toast.warning("全てのフィールドを入力してください", { autoClose: 3000 });
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match"); 
      toast.warning("新しいパスワードが一致しません", { autoClose: 3000 });
      return;
    }

    console.log("Sending request to API...");

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")); // Ensure it's parsed
    
      if (!token || !user?.id) {
        console.error("No token or user ID found!");
        toast.error("認証情報が見つかりません。もう一度ログインしてください", { autoClose: 3000 });
        return;
      }
    
      const response = await axios.put(
        `${apiUrl}/v1/users/${user.id}`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response.data);
      console.log("this is the response", response.data);
    
      if (response.status === 200) {
        toast.success("パスワードが正常に更新されました", { autoClose: 3000 });
        setNewPassword("");
        setConfirmPassword("");
        setIsModalOpen(false);
      } else {
        toast.error("パスワードの更新に失敗しました", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("パスワードの更新中にエラーが発生しました", { autoClose: 3000 });
    }
  };

  const handleCloseModal = () => {
    setNewPassword("");
    setConfirmPassword("");
    setIsModalOpen(false);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
    <ToastContainer/>
      <div>
        <div className="flex justify-center items-center min-h-screen w-[calc(100vw-300px)] ">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:max-w-md mx-4">
            <h1 className="text-2xl mb-10 text-center">ユーザープロフィール</h1>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                {user ? (
                  <>
                    <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)] mb-[30px]">
                      名: <span className="font-normal text-[var(--bgc-sidenav)]">{user.first_name}</span>
                    </h3>
                    <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)] mb-[30px]">
                      姓: <span className="font-normal text-[var(--bgc-sidenav)]">{user.last_name}</span>
                    </h3>
                    <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)] mb-[30px]">
                      メールアドレス: <span className="font-normal text-[var(--bgc-sidenav)]">{user.email}</span>
                    </h3>
                    <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)] mb-[30px]">
                      権限: <span className="font-normal text-[var(--bgc-sidenav)]">{user.role}</span>
                    </h3>

                    <button
                      className="w-full p-2.5 text-[16px] border-2 border-transparent bg-[var(--bgc-sidenav)] text-white cursor-pointer rounded-md hover:bg-[var(--fontcolor-header)] transition-all duration-1000 ease-in-out"
                      onClick={() => setIsModalOpen(true)}
                    >
                      パスワードを変更する
                    </button>
                  </>
                ) : (
                  <p className="text-center text-gray-500">ユーザーデータを取得中...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm shadow-2xl">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)] mb-[30px]">パスワードを変更する</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">新しいパスワード</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                  <i className="text-[25px] p-1 bg-white absolute right-3 top-7 cursor-pointer" onClick={toggleNewPasswordVisibility}>
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </i>
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">新しいパスワードを確認する</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i className="text-[25px] p-1 bg-white absolute right-3 top-7 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </i>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 text-gray p-2 rounded-md hover:bg-gray-400 cursor-pointer"
                  onClick={handleCloseModal}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-[var(--bgc-sidenav)] text-white p-2 rounded-md hover:bg-[var(--fontcolor-header)] cursor-pointer"
                >
                  パスワードを更新する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
