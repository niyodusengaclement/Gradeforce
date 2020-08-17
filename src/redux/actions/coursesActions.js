import {
  CREATE_COURSE_FAILURE,
  GET_COURSE_SUCCESS,
  CREATE_COURSE_START,

} from "./actionTypes";
import actionCreator from "./actionCreator";
import { toast } from "react-toastify";

export const getCourses = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(CREATE_COURSE_START));
      const courses = [];
      const courseRef = firestore.collection("courses");
      const crs = await courseRef.get();
      if(crs.empty) {
        return dispatch(actionCreator(GET_COURSE_SUCCESS, []));
      }
      crs.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        courses.push(data)
      });
      return dispatch(actionCreator(GET_COURSE_SUCCESS, courses));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
    }
  };
};
