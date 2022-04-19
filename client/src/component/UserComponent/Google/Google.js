import axios from 'axios'
import React from 'react'
import GoogleLogin from 'react-google-login'
import {useNavigate} from "react-router-dom"

const Google = () => {
  const navigate = useNavigate()
  const responseSuccessGoogle = async({tokenId}) =>{
   let data = await axios.post("/googlelogin",{tokenId})
   console.log(data)
   localStorage.setItem("usertoken",data.data.token)
   localStorage.setItem("userid",data.data._id)
   console.log("google login success")
   navigate('/')
  }

  const responseErrorGoogle = (response) =>{
    navigate('/login')
  }


  return (
    <div>
  <GoogleLogin
    clientId="944103586555-jpq0cub7572f755icvegut75tpsvbqgk.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
  
  )
}

export default Google