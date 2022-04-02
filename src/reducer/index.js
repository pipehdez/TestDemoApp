const types = {
  RESTORE_TOKEN: "RESTORE_TOKEN",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export const actionCreators = {
  signIn: (data) => ({
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
    // In the example, we'll use a dummy token

    type: "SIGN_IN",
    token: "dummy-auth-token",
    user: data,
  }),
  signOut: () => ({ type: "SIGN_OUT" }),
  signUp: (data) =>
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
    // In the example, we'll use a dummy token

    ({ type: "SIGN_IN", token: "dummy-auth-token" }),
};

export const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case types.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case types.SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        user: action.user,
      };
    case types.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        user: null,
      };
  }
}
