import { FaEnvelope, FaLock } from "react-icons/fa";
import LoginPhoto from "../assets/images/login.png";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmition = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reuvindevs.com/liff/public/api/login", {
        email: userEmail,
        password: userPassword,
      });
  
      if (response.data) {
        localStorage.setItem("token", response.data.token); 
        navigate("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  }


   
  
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
                  type="text"
                  placeholder="メールアドレス"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}/>
                <i className="absolute right-2.5">
                  <FaEnvelope />
                </i>
              </div>
  
              <div className="w-[320px] m-5 flex items-center">
                <input className="w-full p-[9px_10px] text-[18px] border border-[var(--fontcolor-header)] rounded"
                  type="password"
                  placeholder="パスワード"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}/>
              </div>
  
              <div className="flex justify-end items-center m-[25px_20px]">
                <p className="m-0 text-[11px] cursor-pointer" onClick={() => navigate("/forgetpassword")}>
                パスワードをお忘れの場合はこちらから
                </p>
              </div>

              <div className="m-5" >
              <button className="w-full p-2.5 text-[16px] rounded-[5px] border-2 border-transparent bg-[var(--bgc-sidenav)] text-white cursor-pointer" 
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