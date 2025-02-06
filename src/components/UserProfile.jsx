

const UserProfile = () => {
    return (
      <>
        <div>
          <h1 className="font-bold ml-[25px] mb-5">ユーザープロフィール</h1>
  
          <div className="flex flex-wrap ml-[20px]">

            <div className="shadow-2xl my-[15px] mx-[5px] p-[20px] rounded-[5px]">
              <h3 className="font-bold">
              名: <span className="font-semibold">Lorry Mae</span>
              </h3>
              <h3 className="font-bold">
              姓: <span className="font-semibold">Mcintire</span>
              </h3>
  
              <h3 className="font-bold">
              メールアドレス: <span className="font-semibold">Mcintiire@test.com</span>
              </h3>
              <h3 className="font-bold">
              権限: <span className="font-semibold">管理者</span>
              </h3>
            </div>

            

            
          </div>
        </div>
      </>
    );
  };
  
  export default UserProfile;