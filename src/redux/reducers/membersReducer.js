import { GET_MEMBERS_SUCCESS, GET_MEMBERS_START, GET_MEMBERS_FAIL } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  progress: 0,
  values: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MEMBERS_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...payload],
      };
    case GET_MEMBERS_FAIL: 
    return {
      ...state,
      error: payload
    };

    default:
      return state;
  }
};
