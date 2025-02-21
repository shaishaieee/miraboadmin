import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPhoto from "../assets/images/login.png";
import "../App.css";
import { data, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { userContext } from "../utils/context";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const context = userContext()
  const handleSubmition = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      toast.warning("全てのフィールドを入力してください");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      toast.warning("有効なメールアドレスを入力してください");
      return;
    }

    try {
      const response = await axios.post("https://reuvindevs.com/liff/public/api/login", {
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
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('メールアドレスまたはパスワードが無効です。' , { autoClose: 3000 })
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
   
  
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-medium my-4 text-[var(--bgc-sidenav)]">
          Admin <span className="font-light">MIRABO</span>
        </h1>
  
        <div className="flex justify-center items-center shadow-2xl">
          <div className="pt-10 w-[370px] h-[400px]">
            <h3 className="text-center font-normal">サインイン</h3>
  
            <form action="">
              <div className="relative w-[320px] m-5 flex items-center">
                <input className="w-full p-[9px_10px] text-[18px] border border-[var(--fontcolor-header)] rounded"
                  type="email"
                  placeholder="メールアドレス"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  onBlur={handleEmailBlur}/>
                <i className="p-2 text-[24px] absolute right-3">
                  <FaEnvelope />
                </i>
              </div>
  
              <div className="relative w-[320px] m-5 flex items-center">
                <input className="w-full p-[9px_10px] text-[18px] border border-[var(--fontcolor-header)] rounded"
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワード"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}/>
                   <i className="text-[25px] p-2 bg-white absolute right-3 cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </i>
              </div>
  
              <div className="flex justify-end items-center m-[25px_20px]">
                <p className="m-0 text-[11px] cursor-pointer" onClick={() => navigate("/forgetpassword")}>
                パスワードをお忘れの場合はこちらから
                </p>
              </div>

              <div className="m-5" >
              <button className="w-full p-2.5 text-[16px] border-2 border-transparent bg-[var(--bgc-sidenav)] text-white cursor-pointer rounded-md hover:bg-[var(--fontcolor-header)] transition-all duration-1000 ease-in-out" 
              onClick={handleSubmition}>サインイン</button>
            </div>

            </form>
          </div>
  
          <div className="w-[370px] h-[400px] bg-[var(--bgc-sidenav)] p-5">
            <p className="text-center text-white">
            ようこそ、Mirabo管理ダッシュボードへ！
            MiraboのLINEチャットボットに関するすべての記録が安全に保存されています。
            </p>
            <img className="w-[380px]" src={LoginPhoto} alt="Login" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;