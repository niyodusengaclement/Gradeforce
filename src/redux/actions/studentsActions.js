import { GET_STUDENTS,GET_STUDENTS_FAILURE, ACTION_START } from "./actionTypes";
import actionCreator from "./actionCreator";

export const getStudents = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const students = [];
    dispatch(actionCreator(ACTION_START));
    return firestore
      .collection("users")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          students.push(data);
        });
        return dispatch(actionCreator(GET_STUDENTS, students));
      })
      .catch((error) => {
        return dispatch(actionCreator(GET_STUDENTS_FAILURE, error));
      });
  };
};
