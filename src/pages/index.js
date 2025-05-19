import React from 'react'
import Sidenav from '../components/Sidenav/Sidenav'
import Header from '../components/Header/Header'
// import Dashboard from '../components/Dashboard/Dashboard'

const MainPage = () => {
  // const { user } = useUser();
  return (<>
  
     {/* <Header user={user}/> */}
     <Header />

    <Sidenav/>
    {/* <Dashboard/>  */}
    <div style={{
  display:'flex',
  justifyContent:'center',
  marginTop:"50px"
}}> 

<img src='https://media1.tenor.com/m/ZrFooc6A9ysAAAAC/goodgoodgeneral-mental-health.gif'/>
</div>
    
  </>
  )
}

export default MainPage;