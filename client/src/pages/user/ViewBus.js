import React from 'react'
// import Footer from '../../component/UserComponent/Footer/Footer'
import ViewBuss from '../../component/UserComponent/ViewBus/ViewBus'
import Header from '../../component/UserComponent/Header/Header'
import axios from 'axios'


const ViewBus = () => {

//   const [data,setData]=React.useState([])

// React.useEffect(()=>{

//   (async()=>{
//     try {
//       let {data} = await axios.get("/viewbus")
//       setData(data)
//     } catch (error) {
//       console.log(error.response);
//     }
    
//   })()
    
// },[])

  return (
    <div>
        <Header/>
        {/* {data.map((data)=>( */}
        <ViewBuss />
        {/* ))} */}
        {/* <Footer/> */}
    </div>
  )
}

export default ViewBus

// data={data}