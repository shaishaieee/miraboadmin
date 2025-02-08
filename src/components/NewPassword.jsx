import React, { useState } from "react";
import Forget from "../assets/images/forget.png";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
    } else {
      alert("Password successfully updated!");
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="shadow-md w-[400px]"> 
          <div className="bg-white p-8 ">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            新しいパスワードを作成する
            </h2>

            <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  新しいパスワード
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="新しいパスワードを入力してください"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium mb-2"
                >
                  パスワードを確認してください
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="パスワードを再入力してください"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[var(--bgc-sidenav)] text-white cursor-pointer rounded-md mt-4 hover:bg-[var(--fontcolor-header)] transition-all duration-1000 ease-in-out"
                onClick={() => navigate("/")}
              >
                提出する
              </button>
            </form>
            </div> 
          </div>

          <div className="flex justify-center items-center w-[400px] h-[200px] bg-[var(--bgc-sidenav)] px-[30px} py-[20px]">
            <img className="w-[200px]" src={Forget} alt="Forget Password" />
            <p className="text-white items-center mr-[20px]"> パスワードをお忘れの場合はこちらから。</p>
          </div>
        </div>
    </div>
  );
};

export default NewPassword;
