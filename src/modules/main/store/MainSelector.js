import { UserRole } from "../../../constants/user";

export const mainUserSelector = state => state.main.user;

export const mainIsProfileLoadingSelector = state =>
  state.main.isProfileLoading;

export const mainHasUserProfileSelector = state => !!state.main.user;

export const mainUserIdSelector = state => state.main.user?.id;

export const mainUserIsAdminSelector = state =>
  state.main.user?.role === UserRole.ADMIN;

export const mainUserIsAuthenticatingSelector = state =>
  state.main.isAuthenticating;

export const mainUserIsRegisteringSelector = state => state.main.isRegistering;

export const mainUserIsLoggingOutSelector = state => state.main.isLoggingOut;
