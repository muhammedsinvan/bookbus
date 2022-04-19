import React from 'react'
import Home from '../../component/CompanyComponent/Home/home'
import Header from '../../component/CompanyComponent/Header/header'
import SubHeader from '../../component/CompanyComponent/SubHeader/SubHeader'

const home = () => {
  return (
    <div>
        <Header/>
        <SubHeader/>
      <Home/>
    </div>
  )
}

export default home
