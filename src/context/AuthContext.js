import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, user: ''};
    case 'signin':
    case 'signup':
      return {
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const signin = dispatch => {
  return (user) => {
    // Do some API Request here
    console.log('Signin');
    dispatch({
      type: 'signin',
      payload: {
        token: 'some access token here',
        user,
      },
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout},
  {token: null, user: ''},
);