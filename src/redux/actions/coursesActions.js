import {
  CREATE_COURSE_FAILURE,
  GET_COURSE_SUCCESS,
  CREATE_COURSE_START,
  GET_COURSE_SECTIONS,
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

export const getAllSections = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(actionCreator(CREATE_COURSE_START));
    try {
      const firestore = getFirestore();
      const snapshot = await firestore.collection("sections").get();
      let courseSections = [];
      snapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        courseSections.push(data);
      });
      dispatch({
        type: GET_COURSE_SECTIONS,
        payload: courseSections,
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };
};
