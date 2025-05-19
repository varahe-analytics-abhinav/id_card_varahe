import { capitalize } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useLogout } from "../hooks/user";

export default function Header({user}){
 
  // console.log(user)
  // let navigate = useNavigate();

  // const logoutAccount = useLogout();
  // const handleLogout = async () => {
  //     const is_logged_out = await logoutAccount();
  //     is_logged_out && navigate(`/account/login`);
  // }
    return <>
<nav className="main-header navbar navbar-expand navbar-dark">
  <ul className="navbar-nav">
  <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" role="button"><i class="fas fa-bars"></i></a>
      </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    
  
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li>
    <li className="nav-item">
    <div className="am-header-right">
                <div className="dropdown dropdown-profile">
                    <a href="/" className="nav-link nav-link-profile" data-toggle="dropdown">
                        <img src="/assets/img/img12.jpg" className="wd-32 rounded-circle" alt="img" />
                        {/* <span className="logged-name"><span className="hidden-xs-down">{capitalize(user.name)}</span> <i className="fa fa-angle-down mg-l-3"></i></span> */}
                        <span className="logged-name"><span className="hidden-xs-down">Abhinav</span> <i className="fa fa-angle-down mg-l-3"></i></span>
                    </a>
                    <div className="dropdown-menu wd-200">
                        <ul className="list-unstyled user-profile-nav">
                            <li><a style={{color:"white",cursor:"pointer"}}><i className="icon ion-ios-person-outline"></i> Edit Profile</a></li>
                            <li style={{color:"white",cursor:"pointer"}}><a ><i className="icon ion-power"></i> Sign Out</a></li>
                            {/* <li style={{color:"white",cursor:"pointer"}}><a onClick={handleLogout}><i className="icon ion-power"></i> Sign Out</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>
    </li>



  </ul>
</nav>


    </>
}