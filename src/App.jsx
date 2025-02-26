import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ForgetPassword from './components/ForgetPassword'
import Dashboard from './components/Dashboard'
import UserManagement from './components/UserManagement'
import UserProfile from './components/UserProfile'
import CsvExcelUpload from './components/CsvExcelUpload'
import Layout from './components/Layout'
import NewPassword from './components/NewPassword'
import TotalUsersInfo from './components/TotalUsersIfo'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useState } from 'react'
import { UserContext } from './utils/context'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [data, setData] = useState(null)

  return (
    <>
    <ToastContainer />
    <UserContext.Provider value={{ data, setData }}>
      <Routes>
          <Route path="/" element= {<Login/>}/>
          <Route path="/forgetpassword" element= {<ForgetPassword/>}/>
          <Route path="/newpassword" element= {<NewPassword/>}/>
          
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout/>}>
            <Route path="dashboard" element= {<Dashboard/>}/>
            <Route path="usermanagement" element= {<UserManagement/>}/>
            <Route path="totalusersinfo" element= {<TotalUsersInfo/>}/>
            <Route path="userprofile" element= {<UserProfile/>}/>
            <Route path="csvexcelupload" element= {<CsvExcelUpload/>}/>
            </Route>
          </Route>
        </Routes>
      </UserContext.Provider>
       
    </>
  )
}

export default App
