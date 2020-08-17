import React from "react";
import { faBars, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/styles.scss";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/index";
import { connect } from "react-redux";

const TopHeader = (props) => {
	const {userProfile} = props;
  const isInstructor = userProfile.role === 'instructor' ? true : false;
  
  const showOrHideSidebar = () => {
    const el = document.getElementById('sidebar');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }
  const rightToggle = () => {
    const el = document.getElementById('dropdown');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }

  return (
    <>
      <Sidebar />
      <div className="main-header">
        <div className="logo-header">
          <Link to="#" className="logo">
            Gradeforce
          </Link>
          <button className="navbar-toggler sidenav-toggler ml-auto" type="button" onClick={showOrHideSidebar}>
            <span className="navbar-toggler-icon"><FontAwesomeIcon className="top-icons" icon={faBars} /></span>
          </button>
          <button className="topbar-toggler more" onClick={rightToggle}><FontAwesomeIcon className="top-icons" icon={faEllipsisV} /></button>
          
          <div className="dropdown auto-hide" >
              <div className="dropdown-menu float-right" id="dropdown">
                {
                  isInstructor && props.buttons && props.buttons.length > 0 ?
                  props.buttons.map((btn, idx) =>
                  <button className="dropdown-item" key={idx} name={btn.name} onClick={btn.clickHandler}>{btn.name}</button>
                  ) 
                  :
                  null
                }

              </div>
          </div>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <h5 className="nav-title">{props.page}</h5>

            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item">
                <div>
                  {
                  isInstructor && props.buttons && props.buttons.length > 0 ?
                  props.buttons.map((btn, idx) =>
                  <button type="button" className={!btn.class ? "blue-btn" : btn.class} key={idx} name={btn.name} onClick={btn.clickHandler}><span>{btn.name}</span></button>
                  ) 
                  :
                  null
                }
                </div>
              </li>
						</ul>
          </div>
        </nav>
		  </div>
  </>
  );
};

const mapStateToProps = ({ firebase }) => ({
  userProfile: firebase.profile,
})

export default connect(mapStateToProps)(TopHeader);
