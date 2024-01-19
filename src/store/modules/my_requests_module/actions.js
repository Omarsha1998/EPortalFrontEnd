import axios from 'axios';
import { Cookies } from 'quasar';
import helperMethods from 'src/helperMethods';

let api = process.env.BACKEND_REST_API_URL;
let controllerName = '/api/my-requests/';
let timeOut = process.env.BACKEND_REST_API_TIMEOUT;

export default {
  async get({ commit }, { employeeID, dateRangeSearch }) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      const body = { 'employee_id': employeeID, 'date_range_search': dateRangeSearch }
      let response = await axios.post(api + controllerName + 'get', body, headers, { timeout: timeOut });

      commit('SET_DEFAULT_VALUES');
      commit('SET_NEW_VALUES', response.data.my_requests);

    } catch (error) {
      throw error;
    }
  },
  async requestNotHighLightedToRequester({ commit }, data) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      const body = { 'request_id': data.requestID };
      await axios.put(api + controllerName + 'request-not-high-lighted-to-requester', body, headers, { timeout: timeOut });
      commit('SET_NOT_HIGHLIGHTED_TO_REQUESTER', data.currentIndex);
    } catch (error) {
      throw error;
    }
  },
  async submitComply({ context }, { employeeID, body }) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      await axios.put(api + controllerName + 'submit-comply/' + employeeID, body, headers, { timeout: timeOut });
    } catch (error) {
      throw error;
    }
  },
}