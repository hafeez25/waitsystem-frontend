import axios from 'axios'
import { Constants } from './Constants';


const API_ENDPOINT = process.env.API_ENDPOINT || 'https://amptechapi.herokuapp.com'


export const MakeRequest = async (method, data, callback) => {
    const { url, body, query } = data;
    const token = localStorage.getItem(Constants.AuthToken)
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    let resp;
    switch (method) {
        case "POST":
            try {
                resp = await axios({
                    method,
                    url: `${API_ENDPOINT}${url}`,
                    data: JSON.stringify(body),
                    headers: {
                        ...headers
                    }
                })
                return { err: null, resp: resp.data };
            }
            catch (e) {
                return { err: e, resp: null }
            }
        case "GET":
            try {
                resp = await axios({
                    method,
                    url: `${API_ENDPOINT}${url}`,
                    params: query || {},
                    headers: {
                        ...headers
                    }
                })
                return { err: null, resp: resp.data };
            }
            catch (e) {
                return { err: e, resp: null }
            }

        case "PUT":
        case "DELETE":
        case "PATCH":
            try {
                resp = await axios({
                    method,
                    url: `${API_ENDPOINT}${url}`,
                    params: query || {},
                    data: JSON.stringify(body),
                    headers: {
                        ...headers
                    }
                })
                return { err: null, resp: resp.data };
            }
            catch (e) {
                return { err: e, resp: null }
            }
        default:
            break;
    }
}
