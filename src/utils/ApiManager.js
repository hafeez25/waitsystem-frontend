import axios from 'axios';
import { Constants } from './Constants';

const API_ENDPOINT =
   'http://localhost:5000'||process.env.REACT_APP_API_ENDPOINT || 'https://amptechapi.herokuapp.com';

export const MakeRequest = async (method, data, callback) => {
  const { url, body, query,file } = data;
  const token = localStorage.getItem(Constants.AuthToken);
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  let resp;
  let form;
  switch (method) {
    case 'FILE':
      try {
        form = new FormData()
        form.append('file',file)
        resp = await axios.post(`${API_ENDPOINT}${url}`,form,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        })
        // resp = await axios({
        //   method:'POST',
        //   url: `${API_ENDPOINT}${url}`,
        //   data: form,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: `Bearer ${token}`
        //   },
        // });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            localStorage.clear();
            window.location.replace('/');
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }
    case 'POST':
      try {
        resp = await axios({
          method,
          url: `${API_ENDPOINT}${url}`,
          data: JSON.stringify(body),
          headers: {
            ...headers,
          },
        });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            localStorage.clear();
            window.location.replace('/');
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }
    case 'GET':
      try {
        resp = await axios({
          method,
          url: `${API_ENDPOINT}${url}`,
          params: query || {},
          headers: {
            ...headers,
          },
        });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            localStorage.clear();
            window.location.replace('/');
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }

    case 'PUT':
    case 'DELETE':
    case 'PATCH':
      try {
        resp = await axios({
          method,
          url: `${API_ENDPOINT}${url}`,
          params: query || {},
          data: JSON.stringify(body),
          headers: {
            ...headers,
          },
        });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            localStorage.clear();
            window.location.replace('/');
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }
    default:
      break;
  }
};
