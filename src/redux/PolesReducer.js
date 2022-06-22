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
  return { ...data.resp.data, ...payload };
});

export const EditPole = createAsyncThunk('poles/edit', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.PATCH, {
    url: PoleRoutes.EditPole.replace(':poleid', payload.poleid),
    body: payload,
  });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return { ...data.resp, ...payload };
});

export const DeletePole = createAsyncThunk('poles/delete', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.DELETE, {
    url: PoleRoutes.DeletePole.replace(':poleid', payload.poleid),
    body: payload,
  });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return payload;
});

export const FetchAllPoles = createAsyncThunk('poles/fetchall', async ({ callback }) => {
  const data = await MakeRequest(Api.GET, { url: PoleRoutes.FetchPoles });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

export const FetchPoleAnalytics = createAsyncThunk('poles/fetchanalytics', async ({ callback, payload }) => {
  const data = await MakeRequest(Api.GET, { url: PoleRoutes.analytics, query: payload });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

const PoleSlice = createSlice({
  name: 'poles',
  initialState: {
    poles: [],
    analytics: {},
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
    [AddPole.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        action.payload.location = { _id: action.payload.location, name: action.payload.name };
        // const { data } = action.payload;

        state.poles = [action.payload, ...state.poles];
      }
    },
    [EditPole.fulfilled]: (state, action) => {
      if (action.payload && action.payload.poleid) {
        state.poles.forEach((pole, index) => {
          if (pole._id === action.payload.poleid) {
            action.payload.location = { _id: action.payload.location, name: action.payload.name };
            state.poles[index] = { ...state.poles[index], ...action.payload };
          }
        });
      }
    },
    [DeletePole.fulfilled]: (state, action) => {
      if (action.payload && action.payload.poleid) {
        state.poles = state.poles.filter((pole) => pole._id !== action.payload.poleid);
      }
    },
    [FetchAllPoles.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (!action.payload) return;
      if (Array.isArray(action.payload.data)) {
        state.poles = action.payload.data;
      }
    },
    [FetchPoleAnalytics.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

// export const { setData } = PoleSlice.actions;

export default PoleSlice.reducer;
