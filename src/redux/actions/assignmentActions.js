import { toast } from 'react-toastify';
import { ASSIGNMENT_ACTION_FAILED, ASSIGNMENT_ACTION_START, CREATE_ASSIGNMENT_SUCCESS, GET_ASSIGNMENT_SUCCESS, DELETE_ASSIGNMENT_SUCCESS, UPDATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_SUBMISSION_SUCCESS, GET_ASSIGNMENT_SUBMISSION_SUCCESS, UPLOADING_ASSIGNMENT_FILE_START, UPLOAD_PROGRESS } from "./actionTypes";
import actionCreator from "./actionCreator";

export const getAssignments = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const assignments = [];
      const assRef = firestore.collection("assignments");
      const ass = await assRef.get();
      if(ass.empty) {
        return dispatch(actionCreator(GET_ASSIGNMENT_SUCCESS, []));
      }
      ass.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        assignments.push(data)
      });
      return dispatch(actionCreator(GET_ASSIGNMENT_SUCCESS, assignments));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};

export const getSubmissions = (assignmentId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const submissions = [];
      const ref = firestore.collection("assignmentSubmissions");
      const sub = await ref.where('assignmentId', '==', assignmentId).get();
      if(sub.empty) {
        return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, []));
      }
      sub.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        submissions.push(data);
      });
      return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, submissions));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};

export const getSubmissionsByStudentId = (studentId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const submissions = [];
      const ref = firestore.collection("assignmentSubmissions");
      const sub = await ref.where('studentId', '==', studentId).get();
      if(sub.empty) {
        return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, []));
      }
      sub.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        submissions.push(data);
      });
      return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, submissions));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};