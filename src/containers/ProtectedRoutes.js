import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ProtectedRoutes = ({ profile, component: Component, ...rest }) => {
    localStorage.setItem('rems_user_profile', JSON.stringify(profile));
  return (
    <Route
      {...rest}
      render={(props) => (
        localStorage.getItem('rems_user_id')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} {...rest} />
      )}
    />
  );
};

const mapStateToProps = ({ firebase }) => ({
    profile: firebase.profile,
})
export default connect(mapStateToProps)(ProtectedRoutes);