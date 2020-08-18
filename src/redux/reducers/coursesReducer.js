import {
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_START,
  GET_COURSE_SUCCESS,
} from "../actions/actionTypes";
import {updateArrOfObj} from '../../helpers/utils';


const initialState = {
  isLoading: false,
  isLoaded: false,
  values: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_COURSE_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...payload],
      };
    case CREATE_COURSE_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: payload,
      };
    default:
      return state;
  }
};
