import React from 'react'
import Header from '../../component/UserComponent/Header/Header.js'
import EditProfile from '../../component/UserComponent/Profile/EditProfile'
import Footer from '../../component/UserComponent/Footer/Footer'


const editprofile = () => {
  return (
    <div>
        <Header/>
      <EditProfile/>
      <Footer/>
    </div>
  )
}

export default editprofile
