import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTRATION_SUCCESS } from "../constants/auth-types";
import { LOAD_FEED_SUCCESS } from "../constants/feed-types";
import { CREATE_QUESTION_SUCCESS, CREATE_QUESTION_ERROR } from "../constants/question-types";

// src/reducers/index.js

const initialState = () => {
  return {
    user: {
      id: localStorage.userId,
      isAuthenticated: localStorage.isAuthenticated,
      questions: [],
      },
    feedData: [],
    }
};

const rootReducer = ( state = initialState(), action ) => {
  switch ( action.type ) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, 
        user: {
          id: null,
          isAuthenticated: false,
        } 
      };
    case REGISTRATION_SUCCESS:
      return { ...state, user: action.payload };
    case LOAD_FEED_SUCCESS:
      // Using spread operator:
      return {...state, feedData: [...state.feedData, ...action.payload]};
      // Using concat:
      // return {...state, feedData: state.feedData.concat(action.payload)}
    case CREATE_QUESTION_SUCCESS:
      console.log('question created')
      console.log(...action.payload)
      return { ...state, user: { ...state.user, questions: [...state.user.questions, ...action.payload]} };
    default:
      return state;
  }
};

export default rootReducer;