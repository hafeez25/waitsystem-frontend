import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, AuthRoutes, Constants, PoleRoutes } from '../utils/Constants';
import { MakeRequest } from '../utils/ApiManager';

export const AddPole = createAsyncThunk('poles/add', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.POST, { url: PoleRoutes.AddPole, body: payload });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return { ...data.resp , ...payload};
});

export const EditPole = createAsyncThunk('poles/edit', async ({ payload, callback }) => {
    const data = await MakeRequest(Api.PATCH, { url: PoleRoutes.EditPole, body: payload });
  
    if (data.err) {
      callback('error', data.err, () => {});
      return null;
    }
    callback('success', data.resp, () => {});
    return { ...data.resp , ...payload};
  });

  export const DeletePole = createAsyncThunk('poles/delete', async ({ payload, callback }) => {
    const data = await MakeRequest(Api.PATCH, { url: PoleRoutes.DeletePole, body: payload });
  
    if (data.err) {
      callback('error', data.err, () => {});
      return null;
    }
    callback('success', data.resp, () => {});
    return payload;
  });

  


const PoleSlice = createSlice({
  name: 'poles',
  initialState: {
    poles :[],
    analytics : {}
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
    [AddPole.fulfilled]: (state, action) => {
      if(action.payload){
        const { data } = action.payload;

      if (data && Array.isArray(data.results) && data.results.length) {
        // state.user = data.user;

        
      }
      
      }
    },
    
  },
});

export const { setData } = AuthSlice.actions;

export default AuthSlice.reducer;
