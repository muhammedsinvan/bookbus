import React from "react";
import {Route,Routes} from "react-router-dom"
import Home from "./pages/user/Home"
import Logins from "./pages/user/Login";
import Signups from "./pages/user/Signup";
import ViewBus from "./pages/user/ViewBus";
import CompanyLogin from "./pages/CompanyPage/login"
import CompanySignup from "./pages/CompanyPage/signup"
import CompanyHome from "./pages/CompanyPage/home"
import AddBus from "./pages/CompanyPage/addbus";
import ViewBuss from "./pages/CompanyPage/viewbus.js";
import AdminLogin from "./pages/AdminPage/login.js"
import Google from "./pages/user/google.js"
import TicketDetail from "./pages/user/TicketDetail";
import Payment from "./pages/user/Payment.js";
import Editbus from "./pages/CompanyPage/editbus";
import Profile from "./pages/user/profile.js"
import AdminHome from "./pages/AdminPage/home.js"
import Ticket from "./pages/user/ticket";
import Viewbookins from "./pages/CompanyPage/viewbookins";
import Mybookings from "./pages/user/mybookings";
import NotFound from './component/UserComponent/NotFound/NotFound'
import EditProfile from "./pages/user/editprofile.js"
import Report from "./pages/CompanyPage/report";
import Usermanagment from "./pages/AdminPage/usermanagment";
import Buscompany from "./pages/AdminPage/buscompany"
import Adminreport from "./pages/AdminPage/adminreport";
import Viewbuses from "./pages/AdminPage/viewbuses";
import Userbooking from "./pages/AdminPage/userbooking";
import Banner from "./pages/AdminPage/banner";
import Coupen from "./pages/AdminPage/coupen";
import Viewbanner from "./pages/AdminPage/viewbanner";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="login" element={<Logins/>}/>
      <Route path="/signup" element={<Signups/>}/>
      <Route path="/viewbus" element={ <ViewBus/>}/>
      <Route path="/googlelogin" element={ <Google/>}/>
      <Route path="/ticketdetail/:id" element={<TicketDetail/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path="/company/login" element={<CompanyLogin/>}/>
      <Route path="/company/signup" element={<CompanySignup/>}/>
      <Route path="/company/home" element={<CompanyHome/>}/>
      <Route path="/company/home/addbus" element={<AddBus/>}/>
      <Route path="/company/home/viewbus" element={<ViewBuss/>}/>
      <Route path="/company/home/editbus/:id" element={<Editbus/>}/>
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/home" element={<AdminHome/>}/>
      <Route path="/ticket" element={<Ticket/>}/>
      <Route path="/company/viewbooking/:id" element={<Viewbookins/>}/>
      <Route path="/mybookings" element={<Mybookings/>}/>
      <Route path="/profile/edit" element={<EditProfile/>}/>
      <Route path="/company/report" element={<Report/>}/>
      <Route path="/admin/usermanagment" element={<Usermanagment/>}/>
      <Route path="/admin/buscompany" element={<Buscompany/>}/>
      <Route path="/admin/report" element={<Adminreport/>}/>
      <Route path="/admin/company/viewbus/:id" element={<Viewbuses/>}/>
      <Route path="/admin/userbooking/:id" element={<Userbooking/>}/>
      <Route path="/admin/coupen" element={<Coupen/>}/>
      <Route path="/admin/banner" element={<Banner/>}/>
      <Route path="/admin/viewbanner" element={<Viewbanner/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </div>
  );
}

export default App;
