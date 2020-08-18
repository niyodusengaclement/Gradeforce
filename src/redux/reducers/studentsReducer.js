import {GET_STUDENTS, GET_STUDENTS_FAILURE, ACTION_START} from '../actions/actionTypes';

const initialState = {
  allMembers: [],
  isLoading: false,

}
export default (state=initialState,action) => {
  switch(action.type){
      case GET_STUDENTS : {
        return {
          ...state,
          allMembers: [...action.payload],
          isLoading: false,
        }
      }
      case GET_STUDENTS_FAILURE: {
        return{
          ...state,
          error: action.error,
          isLoading: false,
        }
      }
      case ACTION_START: {
        return{
          ...state,
          isLoading: true,
        }
      }
      default: return state;
  }
}