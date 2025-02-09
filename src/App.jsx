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


const App = () => {
  

  return (
    <>
  
    <Routes>
          <Route path="/" element= {<Login/>}/>
          <Route path="/forgetpassword" element= {<ForgetPassword/>}/>
          <Route path="/newpassword" element= {<NewPassword/>}/>
          

          <Route element={<Layout/>}>
          <Route path="/dashboard" element= {<Dashboard/>}/>
          <Route path="/usermanagement" element= {<UserManagement/>}/>
          <Route path="/totalusersinfo" element= {<TotalUsersInfo/>}/>
          <Route path="/userprofile" element= {<UserProfile/>}/>
          <Route path="/csvexcelupload" element= {<CsvExcelUpload/>}/>
          </Route>
        </Routes>

       
    </>
  )
}

export default App
