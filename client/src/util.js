import axios from 'axios';
import store from './store/configureStore';

export const callApi = async (resource, data=null) => {
  const response = await axios(resource, data)

  //if (response.status !== 200) throw Error(response);

  return response;
};

export const requireAuth = (nextState, replace, next) => {
  const user = store.getState().user;
  console.log(user);
  if (!user.isAuthenticated) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }
  next();
}