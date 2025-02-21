import { useNavigate } from "react-router-dom";
import Forget from "../assets/images/forget.png";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleRequestNewPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("メールアドレスを入力してください");
      return;
    }

    try {
      const response = await axios.post("https://reuvindevs.com/liff/public/api/forgot-password", { email });

      if (response.data.message) {
        navigate("/", { state: { email } });
        toast.success("パスワードのリセットがメールに正常に送信されました");
      } else {
        toast.warning("メールアドレスが見つかりません");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      toast.error("メールアドレスの確認中にエラーが発生しました");
    }
  };
    
    return (
      <>
        <main>
          <div className="flex flex-col items-center">
            <h1 className="text-[var(--bgc-sidenav)] mt-[70px] mb-5 font-semibold text-3xl">
              Admin <span className="text-[var(--bgc-sidenav)] font-light">MIRABO</span>
            </h1>
  
            <div className="mb-[60px] shadow-2xl"> 
              <div className="flex justify-center items-center w-[400px] h-[200px] bg-[var(--bgc-sidenav)] px-[30px} py-[20px]">
                <img className="w-[200px]" src={Forget} alt="Forget Password" />
                <p className="text-white items-center mr-[20px]">
                パスワードをお忘れの場合はこちらから。
                </p>
              </div>
  
              <div className="w-[400px] h-[250px] px-[30px] py-[20px]">
                <p className="text-[16px] text-center text-[var(--bgc-sidenav)]">
                パスワードをお忘れの場合はこちらから新しいパスワードを発行してください。
                </p>
                <form 
                onSubmit={handleRequestNewPassword} 
                >
                  <div className="relative flex justify-center w-full my-[20px] mx-0">
                    <input className="w-full p-[10px] text-[16px] border-[1px] border-[var(--bgc-sidenav)] rounded-[5px]" 
                    type="email" 
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <i className="absolute text-[20px] right-[20px] top-[11px]">
                      <FaEnvelope />
                    </i>
                  </div>
  
                  <div className="flex justify-center w-full h-[40px]">
                    <button className="w-full text-[16px] bg-[var(--bgc-sidenav)] border-2 border-transparent transition-all duration-1000 ease-in-out text-white cursor-pointer rounded-md hover:bg-[var(--fontcolor-header)]"
                    type="submit">
                    新しいパスワードをリクエスト
                    </button>
                  </div>
                </form>
  
                <h5 className="cursor-pointer text-[var(--bgc-sidenav)] pt-4 hover:text-[var(--fontcolor-header)]" onClick={() => navigate("/")}>ログインページへ</h5>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  };
  
  export default ForgetPassword;