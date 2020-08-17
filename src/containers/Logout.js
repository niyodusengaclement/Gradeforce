import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import Login from "./Login";

const Logout = (props) => {
    useEffect(() => { props.signout() }, [])
  return (
      <Login />
  );
};


export default connect(null, {
    signout: logout
})(Logout);
