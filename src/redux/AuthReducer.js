import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, AuthRoutes, Constants, profileRoutes } from '../utils/Constants';
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

export const FetchMyDetail = createAsyncThunk('auth/me', async () => {
  const data = await MakeRequest(Api.GET, { url: AuthRoutes.me });
 
  if (data.err) {
    
    return null;
  }
  
  return data.resp.data;
});

export const TwoFactor = createAsyncThunk('auth/twofactorverify', async ({ payload, callback }) => {
  console.log(payload)
  const data = await MakeRequest(Api.POST, { url: AuthRoutes.twofactor, body: payload });
  console.log(data)
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

export const EditProfile = createAsyncThunk('auth/updateprofile',async({payload,callback})=>{
  const data = await MakeRequest(Api.PATCH, { url: profileRoutes.editProfile, body: payload });
  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return payload;
})

export const UpdatePassword = createAsyncThunk('auth/updatepassword',async({payload,callback})=>{
  const data = await MakeRequest(Api.POST, { url: profileRoutes.updatePwd, body: payload });
  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp.data;
})

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
      if(action.payload){
        const { remember, data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data && data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      }
    },
    [TwoFactor.fulfilled]: (state, action) => {
      if(action.payload){
        const { remember, data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data && data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      }
    },
    [Signup.fulfilled]: (state, action) => {
      if(action.payload){
        const { data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data && data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      }
    },

    [FetchMyDetail.fulfilled]: (state,action)=>{
      if(action.payload){
        console.log(action.payload);
        if(action.payload.user){
          localStorage.setItem(Constants.UserProfile,JSON.stringify(action.payload.user))
          state.user = action.payload.user;
        }
      }
    },

    [ChangePassword.fulfilled]: (state, action) => {
      if(action.payload){
        const { data } = action.payload;

      if (data && data.user) {
        // state.user = data.user;
        localStorage.setItem(Constants.UserProfile, JSON.stringify(data.user));
      }
      if (data && data.token) {
        // state.token = token;
        localStorage.setItem(Constants.AuthToken, data.token);
      }
      if (data && data.token && data.user) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      }
    },
    [EditProfile.fulfilled]:(state,action) =>{
      if(action.payload && action.payload.name){
        state.user = {...state.user,...action.payload}
        localStorage.setItem(Constants.UserProfile,JSON.stringify(state.user))
      }
    },
    [UpdatePassword.fulfilled]:(state,action) =>{
      if(action.payload && action.payload.token){        
        localStorage.setItem(Constants.AuthToken,action.payload.token)
      }
    }
  },
});

export const { setData } = AuthSlice.actions;

export default AuthSlice.reducer;
