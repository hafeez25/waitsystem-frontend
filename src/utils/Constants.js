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
  me: '/auth/me',
  submitpassword: '/auth/changepassword',
};

const PlaceRoutes = {
  addplace: '/service/place',
  editPlace: '/service/place/:id',
  deletePlace: '/service/place/:id',
  getPlace: '/service/place/:id',
  searchPlace: '/service/searchplace',
  analytics: '/service/place/analytics',
  PolesOfLocation: '/service/places/poles',
};

const PoleRoutes = {
  AddPole: '/service/pole',
  EditPole: '/service/pole/:poleid',
  DeletePole: '/service/pole/:poleid',
  FetchPoles: '/service/poles',
  analytics: '/service/pole/analyics',
};

const profileRoutes = {
  image: '/profile/image',
  editProfile: '/profile/edit',
  updatePwd: '/profile/updatepassword',
};

const ViewProfileRoutes = {
  generalDetails: '/profile/:userid',
  polesAdded: '/profile/poles/:userid',
  locationsAdded: '/profile/places/:userid',
};

export { Constants, Api, AuthRoutes, PoleRoutes, PlaceRoutes, profileRoutes, ViewProfileRoutes };
