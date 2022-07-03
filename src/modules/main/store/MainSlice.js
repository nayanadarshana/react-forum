import { createSlice } from "@reduxjs/toolkit";

import UsersAPI from "../../../api/user";
import { LS_ACCESS_TOKEN } from "../../../constants/localStorage";
import {getPosts} from "../../home/store/PostsSlice";

const handleGetUserProfileStart = state => {
  state.user = undefined;
  state.isProfileLoading = true;
};

const handleGetUserProfileSuccess = (state, action) => {
  state.user = action.payload.user;
  state.user.role = action.payload.role;
  state.isProfileLoading = false;
};

const handleGetUserProfileFailed = state => {
  state.user = undefined;
  state.isProfileLoading = false;
};

const handleAuthenticateStart = state => {
  state.isAuthenticating = true;
};

const handleAuthenticateSuccess = (state, action) => {
  state.isAuthenticating = false;
  state.user = action.payload.user;
  state.user.role = action.payload.role;
};

const handleAuthenticateFailed = state => {
  state.isAuthenticating = false;
};

const handleUserRegisterStart = state => {
  state.isRegistering = true;
};

const handleUserRegisterSuccess = (state, action) => {
  state.isRegistering = false;

  state.user = action.payload.user;
  state.user.role = action.payload.role;
};

const handleUserRegisterFailed = state => {
  state.isRegistering = false;
};

const handleUserLogoutStart = state => {
  state.isLoggingOut = true;
};

const handleUserLogoutSuccess = state => {
  state.isLoggingOut = false;
  state.user = undefined;
};

const handleUserLogoutFailed = state => {
  state.isLoggingOut = false;
};

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    isProfileLoading: false,
    user: undefined,
    isAuthenticating: false,
    isRegistering: false,
    isLoggingOut: false,
  },
  reducers: {
    getUserProfileStart: handleGetUserProfileStart,
    getUserProfileSuccess: handleGetUserProfileSuccess,
    getUserProfileFailed: handleGetUserProfileFailed,
    authenticateUserStart: handleAuthenticateStart,
    authenticateUserSuccess: handleAuthenticateSuccess,
    authenticateUserFailed: handleAuthenticateFailed,
    registerUserStart: handleUserRegisterStart,
    registerUserSuccess: handleUserRegisterSuccess,
    registerUserFailed: handleUserRegisterFailed,
    logoutUserStart: handleUserLogoutStart,
    logoutUserSuccess: handleUserLogoutSuccess,
    logoutUserFailed: handleUserLogoutFailed,
  },
});

export const {
  getUserProfileStart,
  getUserProfileSuccess,
  getUserProfileFailed,
  authenticateUserStart,
  authenticateUserSuccess,
  authenticateUserFailed,
  registerUserStart,
  registerUserSuccess,
  registerUserFailed,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailed,
} = mainSlice.actions;

export function getUserProfile() {
  return async dispatch => {
    try {
      dispatch(getUserProfileStart());

      const response = await UsersAPI.getUser();

      dispatch(getUserProfileSuccess(response.data));
    } catch (err) {
      dispatch(getUserProfileFailed());
    }
  };
}

export function authenticateUser(authData) {
  return async dispatch => {
    try {
      dispatch(authenticateUserStart());
      // console.log(email,password)
      const response = await UsersAPI.authenticateUser( authData );

      // Persist access token
      localStorage.setItem(LS_ACCESS_TOKEN, response.data.accessToken);

      dispatch(authenticateUserSuccess(response.data));
      dispatch(getPosts(''))
    } catch (err) {
      dispatch(authenticateUserFailed());
    }
  };
}

export function registerUser(email, password, name) {
  return async dispatch => {
    try {
      dispatch(registerUserStart());

      const response = await UsersAPI.registerUser( email, password, name );
      console.log(response.data.accessToken)

      // Persist access token
      localStorage.setItem(LS_ACCESS_TOKEN, response.data.accessToken);

      dispatch(registerUserSuccess(response.data));
      dispatch(getPosts(''))
    } catch (err) {
      dispatch(registerUserFailed());
    }
  };
}

export function logoutUser() {
  return async dispatch => {
    try {
      dispatch(logoutUserStart());

      await UsersAPI.logout();

      // Persist access token
      localStorage.removeItem(LS_ACCESS_TOKEN);

      dispatch(logoutUserSuccess());
    } catch (err) {
      dispatch(logoutUserFailed());
    }
  };
}

export default mainSlice.reducer;
