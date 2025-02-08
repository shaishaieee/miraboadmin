// import { useState, useEffect } from 'react';
// import axios from 'axios';

const UserProfile = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => { 
  //   axios.get(' ') 
  //     .then((response) => {
  //       setUser(response.data); 
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching user data', error); 
  //     });
  // }, []); 

  return (
    <>
    <div>
    <h1 className="font-bold text-[var(--bgc-sidenav)] mb-6">ユーザープロフィール</h1>
    <div className="flex justify-center items-center w-[calc(100vw-300px)] ">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-2xl text-center">ようこそ</h1>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)]">
                名: <span className="font-normal text-[var(--bgc-sidenav)]">Lorry Mae
                {/* {user.first_name} */}
                </span>
              </h3>
              <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)]">
                姓: <span className="font-normal text-[var(--bgc-sidenav)]">Mcintire
                    {/* {user.last_name} */}
                </span>
              </h3>
              <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)]">
                メールアドレス: <span className="font-normal text-[var(--bgc-sidenav)]">Mcintire@test.com
                    {/* {user.email} */}
                </span>
              </h3>
              <h3 className="text-xl font-semibold text-[var(--bgc-sidenav)]">
                権限: <span className="font-normal text-[var(--bgc-sidenav)]">管理者
                    {/* {user.role} */}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default UserProfile;
