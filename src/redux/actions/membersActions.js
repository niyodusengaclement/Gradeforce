import { GET_MEMBERS_SUCCESS, GET_MEMBERS_START, GET_MEMBERS_FAIL } from "./actionTypes";
import actionCreator from "./actionCreator";
import { toast } from 'react-toastify';

export const getMembers = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(GET_MEMBERS_START));
      const members = [];
      const ref = firestore.collection("members");
      const allMembers = await ref.get();
      if(allMembers.empty) {
        return dispatch(actionCreator(GET_MEMBERS_SUCCESS, []));
      }
      allMembers.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        members.push(data)
      });
      return dispatch(actionCreator(GET_MEMBERS_SUCCESS, members));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(GET_MEMBERS_FAIL, err));
    }
  };
};
