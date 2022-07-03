import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, ViewProfileRoutes } from '../utils/Constants';
import { MakeRequest } from '../utils/ApiManager';

export const FetchProfileInfoViewProfile = createAsyncThunk(
  'profile/fetchprofileinfo',
  async ({ payload, callback }) => {
    const data = await MakeRequest(Api.GET, {
      url: ViewProfileRoutes.generalDetails.replace(':userid', payload.id),
      body: payload,
    });

    if (data.err) {
      callback('error', data.err, () => {});
      return null;
    }
    callback('success', data.resp, () => {});
    return data.resp;
  }
);

export const FetchAllPolesViewProfile = createAsyncThunk('profile/fetchallpoles', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.GET, {
    url: ViewProfileRoutes.polesAdded.replace(':userid', payload.id),
    body: payload,
  });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

export const FetchAllLocationsViewProfile = createAsyncThunk(
  'profile/fetchalllocations',
  async ({ payload, callback }) => {
    const data = await MakeRequest(Api.GET, {
      url: ViewProfileRoutes.locationsAdded.replace(':userid', payload.id),
      body: payload,
    });

    if (data.err) {
      callback('error', data.err, () => {});
      return null;
    }
    callback('success', data.resp, () => {});
    return data.resp;
  }
);

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileInfo: {},
    poles: [],
    locations: [],
  },
  reducers: {
    // setData(state, action) {
    //   const { user, token } = action.payload;
    //   if (user) {
    //     state.user = user;
    //     localStorage.setItem(Constants.UserProfile, JSON.stringify(user));
    //   }
    //   if (token) {
    //     state.token = token;
    //     localStorage.setItem(Constants.AuthToken, token);
    //   }
    // },
  },
  extraReducers: {
    [FetchProfileInfoViewProfile.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (!action.payload) return;
      state.profileInfo = action.payload.data;
    },
    [FetchAllPolesViewProfile.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (!action.payload) return;
      if (Array.isArray(action.payload.data)) {
        state.poles = action.payload.data;
      }
    },
    [FetchAllLocationsViewProfile.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (!action.payload) return;
      if (Array.isArray(action.payload.data)) {
        state.locations = action.payload.data;
      }
    },
  },
});

export default ProfileSlice.reducer;
