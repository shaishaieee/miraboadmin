

const UserProfile = () => {
    return (
      <>
        <div>
          <h1 className="font-bold ml-[25px] mb-5">ユーザープロフィール</h1>
  
          <div className="flex flex-wrap ml-[20px]">

            <div className="shadow-2xl my-[15px] mx-[5px] p-[20px] rounded-[5px]">
              <h3 className="font-bold">
                ファーストネーム: <span className="font-semibold">Lorry Mae</span>
              </h3>
              <h3 className="font-bold">
                苗字: <span className="font-semibold">Mcintire</span>
              </h3>
  
              <h3 className="font-bold">
                メール: <span className="font-semibold">Mcintiire@test.com</span>
              </h3>
              <h3 className="font-bold">
                役割: <span className="font-semibold">User</span>
              </h3>
            </div>

            

            
          </div>
        </div>
      </>
    );
  };
  
  export default UserProfile;