import axios from 'axios';
import { Cookies } from 'quasar';
import helperMethods from 'src/helperMethods';

let api = process.env.BACKEND_REST_API_URL;
let controllerName = '/api/work-experiences/';
let timeOut = process.env.BACKEND_REST_API_TIMEOUT;

export default {
  async get({ commit }, employeeID ) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      let response = await axios.get(api + controllerName + 'get' + '?' +'employeeID=' + employeeID
      , headers , { timeout: timeOut });

      commit('SET_DEFAULT_VALUES');
      commit('SET_NEW_VALUES', response.data.work_experiences);

    } catch (error) {
      throw error;
    }
  },
}
