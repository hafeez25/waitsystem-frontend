import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, UniversalSearchRoutes } from '../utils/Constants';
import { MakeRequest } from '../utils/ApiManager';

export const UniversalSearch = createAsyncThunk('search/universalsearch', async ({ payload, callback }) => {
  const data = await MakeRequest(Api.GET, {
    url: UniversalSearchRoutes.universalSearch.replace(':term', payload.term),
    body: payload,
  });

  if (data.err) {
    callback('error', data.err, () => {});
    return null;
  }
  callback('success', data.resp, () => {});
  return data.resp;
});

const UniversalSearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
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
    [UniversalSearch.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (!action.payload) return;
      state.searchResults = action.payload.data;
    },
  },
});

export default UniversalSearchSlice.reducer;
