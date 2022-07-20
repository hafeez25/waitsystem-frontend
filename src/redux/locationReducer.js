import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, PlaceRoutes } from '../utils/Constants';
import { MakeRequest } from '../utils/ApiManager';

export const AddPlace = createAsyncThunk('Places/add', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.POST, { url: PlaceRoutes.addplace, body: payload });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return { ...data.resp.data, ...payload };
});

export const EditPlace = createAsyncThunk('Places/edit', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.PATCH, {
    url: PlaceRoutes.editPlace.replace(':id', payload.id),
    body: payload,
  });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return { ...data.resp, ...payload };
});

export const DeletePlace = createAsyncThunk('Places/delete', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.DELETE, {
    url: PlaceRoutes.deletePlace.replace(':id', payload.id),
    body: payload,
  });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return payload;
});

export const FetchAllPlaces = createAsyncThunk('Places/fetchall', async ({ callback }) => {
  const data = await MakeRequest(Api.GET, { url: PlaceRoutes.searchPlace, query: { text: '' } });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp.data;
});

export const FetchLocationAnalytics = createAsyncThunk('Places/fetchanalytics', async ({ payload }) => {
  const data = await MakeRequest(Api.GET, { url: PlaceRoutes.analytics, query: payload });

  if (data.err) {
    // callback('error', data.err, () => {});
    return null;
  }
  // callback('success', data.resp, () => {});
  return { ...data.resp, id: payload.id };
});

export const FetchPolesOfLocation = createAsyncThunk('Places/fetchpoles', async ({ payload }) => {
  const data = await MakeRequest(Api.GET, { url: PlaceRoutes.PolesOfLocation, query: payload });

  if (data.err) {
    // callback('error', data.err, () => {});
    return null;
  }
  // callback('success', data.resp, () => {});
  return { ...data.resp, id: payload.id };
});

export const FetchLocation = createAsyncThunk('Places/fetchlocation', async ({ callback, payload }) => {
  const data = await MakeRequest(Api.GET, { url: PlaceRoutes.getPlace.replace(':id', payload.id) });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

export const FetchHighTrafficPlaces= createAsyncThunk('Places/fetchhightrafficplaces', async ({ callback }) => {
  const data = await MakeRequest(Api.GET, { url: PlaceRoutes.highTrafficPlace });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp.data;
});


const PlaceSlice = createSlice({
  name: 'Places',
  initialState: {
    Places: [],
    analytics: {},
    highTrafficPlaces:[],
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
    [AddPlace.fulfilled]: (state, action) => {
      // console.log(action.payload);
      //   if (action.payload) {
      //     const { data } = action.payload;

      //     if (data && Array.isArray(data.results) && data.results.length) {
      //       // state.user = data.user;
      //     }
      //   }
      console.log(action.payload);
      if (action.payload) {
        // action.payload.location = { _id: action.payload.location, name: action.payload.name };
        // const { data } = action.payload;
        action.payload._id = action.payload.id;

        state.Places = [action.payload, ...state.Places];
      }
    },
    [EditPlace.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload && action.payload.id) {
        state.Places.forEach((place, index) => {
          if (place._id === action.payload.id) {
            // action.payload.location = { _id: action.payload.location, name: action.payload.name };
            state.Places[index] = { ...state.Places[index], ...action.payload };
          }
        });
      }
    },
    [DeletePlace.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload && action.payload.poleid) {
        state.Places = state.Places.filter((place) => place._id !== action.payload.id);
      }
    },
    [FetchAllPlaces.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload && Array.isArray(action.payload.results)) {
        state.Places = action.payload.results;
      }
    },
    [FetchLocationAnalytics.fulfilled]: (state, action) => {
      console.log(action.payload);
      // if(action.payload){

      // }
      if (action.payload && state.analytics[action.payload.id]) {
        state.analytics[action.payload.id].analytics = action.payload.data;
      }
    },
    [FetchLocation.fulfilled]: (state, action) => {
      if (action.payload) {
        const { data } = action.payload;
        state.analytics[data._id] = data;
      }
    },
    [FetchPolesOfLocation.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload && state.analytics[action.payload.id]) {
        state.analytics[action.payload.id].poles = action.payload.data;
      }
    },
    
    [FetchHighTrafficPlaces.fulfilled]: (state,action) => {
      console.log(action.payload);
      state.highTrafficPlaces= action.payload;
    }


  },
});

// export const { setData } = PlaceSlice.actions;

export default PlaceSlice.reducer;
