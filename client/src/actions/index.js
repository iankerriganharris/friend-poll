// src/actions/index.js
import React from 'react';
import { 
          LOGIN_SUCCESS, LOGIN_FAILURE, 
          LOGOUT_SUCCESS, LOGOUT_FAILURE,
          REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
        } from '../constants/auth-types';
import {
          LOAD_FEED_SUCCESS, LOAD_FEED_ERROR,
        } from '../constants/feed-types';
import {
          CREATE_QUESTION_SUCCESS, CREATE_QUESTION_ERROR,
          DESTROY_QUESTION_SUCCESS, DESTROY_QUESTION_ERROR
        } from '../constants/question-types';

import {
          DO_SEARCH_ERROR, DO_SEARCH_SUCCESS
        } from "../constants/search-types";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import history from '../history'

export const loginSuccess = response => {
  return dispatch => {
    console.log('Redirecting...');
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    history.push(`/${response.data.user.screen_name}`)
  }
}

export const loginError = error => ({ type: LOGIN_FAILURE, error });

export const login = userData => {
  return async dispatch => {
    const payload = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      data: JSON.stringify(userData),
    }
    const response  = await axios('/api/accounts/login', payload);
    if (response.status >= 200 && response.status < 300) {
      dispatch(loginSuccess(response));
    } else {
      const error = response.statusText;
      dispatch(loginError(error));
    }
  }
}

export const logoutSuccess = response => {
  return dispatch => {
    dispatch({ type: LOGOUT_SUCCESS, payload: response });
    localStorage.setItem('userId', null);
    localStorage.setItem('isAuthenticated', false);
    <Redirect to='/login' />
  }

}

export const logoutError = error => ({ type: LOGOUT_FAILURE, error });

export const logout = () => {
  return async dispatch => {
    const response = await axios('/api/accounts/logout', { credentials: 'include' });
    if (response.status >= 200 && response.status < 300) {
      dispatch(logoutSuccess(response));
    } else {
      const error = response.statusText;
      dispatch(logoutError(error));
    } 
  }
}

export const registrationSuccess = response => {
  return dispatch => {
    dispatch({ type: REGISTRATION_SUCCESS, payload: response.data.user });
    localStorage.setItem('userId', response.data.user.id);
    localStorage.setItem('isAuthenticated', true);
    <Redirect to='/' />
  }
}

export const registrationError = error => ({ type: REGISTRATION_FAILURE, error });

export const register = userData => {
  return async dispatch => {
    const payload = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      data: JSON.stringify(userData),
    }
    const response = await axios('/api/accounts/register', payload);
    if (response.status >= 200 && response.status < 300) {
      dispatch(registrationSuccess(response));
    } else {
      const error = response.statusText;
      dispatch(registrationError(error));
    }
  }
}



// Feed

export const loadFeedSuccess = response => {
  return dispatch => {
    dispatch({ type: LOAD_FEED_SUCCESS, payload: response.data.results });
  }
}

export const loadFeedError = error => ({ type: LOAD_FEED_ERROR, error });

export const loadFeed = url => {
  return async dispatch => {
    const payload = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'GET',
    }
    const response = await axios(url, payload);
    if (response.status >= 200 && response.status < 300) {
      dispatch(loadFeedSuccess(response));
    } else {
      const error = response.statusText;
      dispatch(loadFeedError(error));
    }
  }
}



// Question

export const createQuestionSuccess = newQuestionObject => {
  return dispatch => {
    dispatch({ type: CREATE_QUESTION_SUCCESS, payload: newQuestionObject });
    <Redirect to='/question' />
  }
}

export const createQuestionError = error => ({ type: CREATE_QUESTION_ERROR, error });

export const createQuestion = (description, idAccount) => {
  const questionData = { ...description, idAccount: idAccount }
  return async dispatch => {
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      data: JSON.stringify(questionData),
    }
    const response = await axios('/api/questions', request);
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      dispatch(createQuestionSuccess(response.data));
    } else {
      const error = response.statusText;
      dispatch(createQuestionError(error));
    }
  }
}

export const destroyQuestionSuccess = id => {
  return dispatch => {
    dispatch({ type: DESTROY_QUESTION_SUCCESS, payload: id });
    <Redirect to='/question' />
  }
}

export const destroyQuestionError = error => ({ type: DESTROY_QUESTION_ERROR, error })

export const destroyQuestion = (idQuestion) => {
  const questionData = { idQuestion: idQuestion }
  return async dispatch => {
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'DELETE',
      data: JSON.stringify(questionData)
    }
    const response = await axios('/api/questions', request)
    if (response.status >= 200 && response.status < 300) {
      dispatch(destroyQuestionSuccess(response.data))
    } else {
      const error = response.statusText
      dispatch(destroyQuestionError(error))
    }
  }
}


// Search

export const doSearchSuccess = results => {
  return dispatch => {
    dispatch({type: DO_SEARCH_SUCCESS, payload: results})
  }
}

export const doSearchError = error => ({ type: DO_SEARCH_ERROR, error })

export const doSearch = (terms) => {
  return async dispatch => {
    const request = {
      credentials: 'include',
      method: 'GET'
    }
    const response = await axios(`/api/search?q=${terms}`, request)
    if (response.status >= 200 && response.status < 300) {
      dispatch(doSearchSuccess(response.data))
    } else {
      const error = response.statusText
      dispatch(doSearchSuccess(error))
    }
  }
}