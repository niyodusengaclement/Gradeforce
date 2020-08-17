import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export const login = (user) => {
  return async (dispatch, state, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const snapshot = await firestore.collection('users').where('email','==', user.email).get();
    const autoSignIn = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then( (doc) => {
      localStorage.setItem('rems_user_id', doc.user.uid);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        response: {message: 'success'}
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        error
      })
    })
    }

    if(snapshot.empty) {
      return toast.error('Invalid Credentials', {
        hideProgressBar: true,
        position: 'top-center'
      });
    }
    else snapshot.forEach(doc => {
      const role = doc.data().role;
      if(role !== 'admin') {
        return toast.error('Access denied! Permission not granted', {
          hideProgressBar: true,
          position: 'top-center'
        });
      }
      autoSignIn();
    });
  };
};

export const logout = () => {
  return async (dispatch, state, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().signOut().then(function() {
      localStorage.removeItem('rems_user_id');
      localStorage.removeItem('rems_user_profile');
      toast.success('You are successfully logged out', {
        hideProgressBar: true,
        position: 'top-center'
      });
    }).catch(function(error) {
      toast.error(error, {
        hideProgressBar: true,
        position: 'top-center'
      });
    });
  };
};
