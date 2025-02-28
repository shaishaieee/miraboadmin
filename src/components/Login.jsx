import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPhoto from "../assets/images/login.png";
import "../App.css";
import { data, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { userContext } from "../utils/context";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const context = userContext()

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSubmition = async (e) => {
    e.preventDefault();
    setError("");

    if (!userEmail || !userPassword) {
      toast.warning("全てのフィールドを入力してください");
      setError("メールアドレスまたはパスワードを入力してください");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      toast.warning("有効なメールアドレスを入力してください");
      setError("有効なメールアドレスを入力してください");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/login`, {
        email: userEmail,
        password: userPassword,
      });
  
      if (response.data) {
        toast.success('ログインに成功しました', { autoClose: 3000 });
        localStorage.setItem("token", response.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.user))
        context.setData(response.data.user)
        navigate("/dashboard");
      } else {
        toast.error('Invalid email or password.' , { autoClose: 3000 })
        setError("メールアドレスまたはパスワードが無効です。");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('メールアドレスまたはパスワードが無効です。' , { autoClose: 3000 })
      setError("メールアドレスまたはパスワードが無効です。");
    } finally {
      setLoading(false);
    }
  }
  console.log(localStorage);
  console.log(context.data);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      toast.warning("有効なメールアドレスを入力してください");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
  };
  
  const handleInputFocus = () => {
    setError("");
  }

    return (
      <>
      <ToastContainer/>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-medium my-4 text-[var(--bgc-sidenav)]">
          Admin <span className="font-light">MIRABO</span>
        </h1>
  
        <div className="flex justify-center items-center shadow-2xl">
          <div className="pt-10 w-[370px] h-[400px]">
            <h3 className="text-center font-normal">サインイン</h3>
  
            <form onSubmit={handleSubmition}>
            <div className="relative w-[320px] m-5 flex flex-col items-start">
              <div className="flex items-center w-full">
                <input className={`w-full p-[9px_10px] text-[18px] border border-[var(--fontcolor-header)] rounded ${error ? 'border-red-500' : 'border-[var(--fontcolor-header)]'}`}
                  type="email"
                  placeholder="メールアドレス"
                  value={userEmail}
                  onChange={handleInputChange(setUserEmail)}
                  onBlur={handleEmailBlur}
                  onFocus={handleInputFocus}/>
                <i className={`p-2 text-[24px] absolute right-3 ${error ? 'text-red-500' : 'text-[var(--fontcolor-header)]'}`}>
                  <FaEnvelope />
                </i>
                </div>
              </div>
  
              <div className="relative w-[320px] m-5 flex flex-col items-start">
              <div className="flex items-center w-full">
                <input className={`w-full p-[9px_10px] text-[18px] border border-[var(--fontcolor-header)] rounded ${error ? 'border-red-500' : 'border-[var(--fontcolor-header)]'}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワード"
                  value={userPassword}
                  onChange={handleInputChange(setUserPassword)}
                  onFocus={handleInputFocus}/>
                    <i className={`text-[25px] p-2 bg-white absolute right-3 cursor-pointer ${error ? 'text-red-500' : 'text-[var(--fontcolor-header)]'}`} 
                    onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </i>
                  </div>
                  <p className={`text-red-500 text-sm my-0.5 h-5 ${error ? 'visible' : 'invisible'}`}>{error}</p>
              </div>
  
              <div className="flex justify-end items-center m-[20px]">
                <p className="m-0 text-[11px] cursor-pointer" onClick={() => navigate("/forgetpassword")}>
                パスワードをお忘れの場合はこちらから
                </p>
              </div>

              <div className="m-5" >
              <button className="w-full p-2.5 text-[16px] border-2 border-transparent bg-[var(--bgc-sidenav)] text-white cursor-pointer rounded-md hover:bg-[var(--fontcolor-header)] transition-all duration-1000 ease-in-out" 
              type="submit"
              disabled={loading}> {loading ? "ログイン中..." : "サインイン"}</button>
            </div>

            </form>
          </div>
  
          <div className="w-[370px] h-[400px] bg-[var(--bgc-sidenav)] p-5">
            <p className="text-center text-white">
            ようこそ、Mirabo質問部屋AI管理ダッシュボードへ！
            Mirabo質問部屋AIに関する記録がこちらに保存されています。
            </p>
            <img className="w-[380px]" src={LoginPhoto} alt="Login" />
          </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Login;