import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, AuthRoutes, Constants } from '../utils/Constants';
import { MakeRequest } from '../utils/ApiManager';

export const Login = createAsyncThunk('auth/login', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.POST, { url: AuthRoutes.login, body: payload });
  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return { remember: payload.remember, ...data.resp };
});

export const Signup = createAsyncThunk('auth/signup', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.POST, { url: AuthRoutes.signup, body: payload });
  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

export const ForgotPassword = createAsyncThunk('auth/forgotpassword', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.POST, { url: AuthRoutes.forgotpassword, body: payload });
  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

export const ChangePassword = createAsyncThunk('auth/changepassword', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.POST, { url: AuthRoutes.submitpassword, body: payload });
  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem(Constants.UserProfile) ? JSON.parse(localStorage.getItem(Constants.UserProfile)) : {},
    token: localStorage.getItem(Constants.AuthToken),
  },
  reducers: {
    setData(state, action) {
      const { user, token } = action.payload;
      if (user) {
        state.user = user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(user));
      }
      if (token) {
        state.token = token;
        localStorage.setItem(Constants.AuthToken, token);
      }
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, action) => {
      const { remember, data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    [Signup.fulfilled]: (state, action) => {
      const { data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },

    [ChangePassword.fulfilled]: (state, action) => {
      const { data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
  },
});

export const { setData } = AuthSlice.actions;

export default AuthSlice.reducer;
