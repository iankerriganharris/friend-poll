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
        } from '../constants/question-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const loginSuccess = response => {
  return dispatch => {
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    <Redirect to='/profile' />
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
    const response  = await axios('/api/login', payload);
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
    const response = await axios('/api/logout', { credentials: 'include' });
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
    <Redirect to='/profile' />
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
    const response = await axios('/api/register', payload);
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

export const createQuestionSuccess = response => {
  return dispatch => {
    dispatch({ type: CREATE_QUESTION_SUCCESS, payload: response });
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
      console.log(response.data.question_id);
      dispatch(createQuestionSuccess(Array.from(response.data.question_id.description)));
    } else {
      const error = response.statusText;
      dispatch(createQuestionError(error));
    }
  }
}