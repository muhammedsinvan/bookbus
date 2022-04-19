import React from 'react'
import Header from '../../component/UserComponent/Header/Header.js'
import MyBookings from '../../component/UserComponent/MyBookings/MyBookings'
import Footer from '../../component/UserComponent/Footer/Footer'

const mybookings = () => {
  return (
    <div>
        <Header/>
        <MyBookings/>
        <Footer/>
    </div>
  )
}

export default mybookings