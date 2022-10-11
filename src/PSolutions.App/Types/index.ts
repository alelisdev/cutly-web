/**
 * Application props
 */
export interface IApplicationProps {
  email: string;
  lastName: string;
  firstName: string;
  accessToken: string;
  profilePhoto: string;
  currentLanguage: string;
  isAuthenticated: boolean;
}

/**
 * User credentials
 */
export interface IUserCredentials {
  email: string;
  lastName: string;
  firstName: string;
  accessToken: string;
  profilePhoto: string;
  refreshToken: string;
}