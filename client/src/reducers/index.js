import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTRATION_SUCCESS } from "../constants/auth-types";
import { LOAD_FEED_SUCCESS } from "../constants/feed-types";
import { CREATE_QUESTION_SUCCESS, DESTROY_QUESTION_SUCCESS } from "../constants/question-types";
import { DO_SEARCH_ERROR, DO_SEARCH_SUCCESS} from "../constants/search-types";

// src/reducers/index.js

const initialState = () => {
  return {
    user: {
      id: null,
      isAuthenticated: false,
      },
    feedData: [],
    questions: [],
    searchResults: [],
    }
};

const rootReducer = ( state = initialState(), action ) => {
  switch ( action.type ) {
    case LOGIN_SUCCESS:
      return { ...state, user: {...state.user, ...action.payload} };
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
      console.log(action.payload)
      return { ...state, questions: [...state.questions, action.payload] };
    case DESTROY_QUESTION_SUCCESS:
      const questionsCopy = state.questions
      questionsCopy.splice(
        questionsCopy.findIndex(el => el.id === action.payload),
        1)
      return { ...state, questions: [...questionsCopy] }
    case DO_SEARCH_SUCCESS:
      console.log(action.payload.hits)
      return {...state, searchResults: [...state.searchResults, ...action.payload.hits]}
    case DO_SEARCH_ERROR:
      console.log(action.error)
    default:
      return state;
  }
};

export default rootReducer;