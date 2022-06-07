const Constants = {
  AuthToken: 'AuthToken',
  UserProfile: 'UserProfile',
};

const Api = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const AuthRoutes = {
  login: '/auth/login',
  twofactor: '/auth/twofactorverify',
  signup: '/auth/signup',
  forgotpassword: '/auth/forgotpassword',
  submitpassword: '/auth/changepassword',
};

const PoleRoutes = {
  addplace: '/service/place',
};

export { Constants, Api, AuthRoutes, PoleRoutes };
