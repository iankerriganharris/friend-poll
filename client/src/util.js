import store from './store/configureStore';

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