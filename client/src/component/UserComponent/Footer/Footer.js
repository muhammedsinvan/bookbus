import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
       <div id="copyright">
           &copy; All Rights Reserved 2022
       </div>
       <div id="owner">
           <span>
               Designed by <a href="https://www.codingtuting.com">BookMyBus.Com</a>
           </span>
       </div>
    </div>
  )
}

export default Footer