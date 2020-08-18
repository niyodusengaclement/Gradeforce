import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import auth from "./authReducer";
import students from './studentsReducer';
import assignments from './assignmentsReducer';
import membersReducer from "./membersReducer";
import courses from './coursesReducer';

export default combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  students,
  members: membersReducer,
  assignments,
  courses,
});