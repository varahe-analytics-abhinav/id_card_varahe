import { Link } from "react-router-dom";

// import "../../../public/img/favicon.png"
export default function Sidenav() {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src="/img/Logo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Admin panel</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </Link>
              </li>
              {/* <li className="nav-item">
          <Link to="/productivity" className="nav-link">
            <i className="nav-icon fas fa-address-card" />
            <p>
           Productivity 
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/task" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
            Tasks
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/slack" className="nav-link">
          <i className="nav-icon fas fa-question-circle" />
            <p>
            Slack
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/members" className="nav-link">
          <i className="nav-icon fas fa-user" />
            <p>
            Team Members
            </p>
          </Link>
        </li> */}
              <li className="nav-item">
                <Link to="/exceltoPdf" className="nav-link">
                  <i className="nav-icon fas fa-list-alt" />
                  <p>Excel To Pdf</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wit-pdf" className="nav-link">
                  <i className="nav-icon fas fa-list-alt" />
                  <p>W-I-T</p>
                </Link>
              </li>

              {/* <li className="nav-item">
          <Link to="/stations" className="nav-link">
            <i className="nav-icon fas fa-train" />
            <p>
            Stations
            
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/enquiry" className="nav-link">
            <i className="nav-icon fas fa-question-circle" />
            <p>
            Enquiry

            </p>
          </Link>
      
        </li>
   
        <li className="nav-item">
          <Link to="/order" className="nav-link">
            <i className="nav-icon fas fa-shopping-cart" />
            <p>Order</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/featureitem" className="nav-link">
            <i className="nav-icon fas  fa-list-alt" />
            <p>Feature Item</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link">
            <i className="nav-icon fas fa-user-friends" />
            <p>Customer</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            <i className="nav-icon fas fa-user" />
            <p>Users</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cusine" className="nav-link">
            <i className="nav-icon fas fa-bread-slice" />
            <p>Cusine</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/foodtype" className="nav-link">
            <i className="nav-icon fas fa-cheese" />
            <p>Food Type</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/blog" className="nav-link">
            <i className="nav-icon fas fa-blog" />
            <p>Blog</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/location" className="nav-link">
            <i className="nav-icon fas fa-map-marker" />
            <p>Location</p>
          </Link>
        </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
