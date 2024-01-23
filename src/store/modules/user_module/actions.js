import axios from 'axios';
import helperMethods from 'src/helperMethods';

let api = process.env.BACKEND_REST_API_URL;
let controllerName = '/api/users/';
let timeOut = process.env.BACKEND_REST_API_TIMEOUT;

export default {
  async login({ dispatch }, { employeeID, password }) {
    try {
      const body = JSON.stringify({ 'employee_id': employeeID, 'password': password });
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(api + controllerName + 'login', {
        method: 'POST',
        headers: headers,
        body: body,
        timeout: timeOut, // Note: The 'timeout' option is not natively supported by fetch
      });


      if (response.status !== 200) {
        throw await response.json();
      }

      const responseData = await response.json();
      let token = responseData.token;

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 3); // Expires in 3 days

      helperMethods.createCookie('token', token, { expires: expirationDate, path: '/' });

      dispatch('setNewValues', token);
    } catch (error) {
      throw error;
    }
  },


  async logout({ dispatch }, employeeID) {
    try {
      const token = helperMethods.getCookie('token');
      const body = JSON.stringify({ 'employee_id': employeeID }); // Convert to JSON string
      const headers = {
        'Authorization': 'Bearer ' + token
      };

      const response = await fetch(api + controllerName + 'logout', {
        method: 'POST',
        headers: headers,
        body: body,
        timeout: timeOut,
      });

      if (response.status === 200 || response.status === 401) {
        dispatch('setDefaultValues');
      } else {
        throw new Error('An error has occurred in user_module.logout()');
      }
    } catch (error) {
      throw error;
    }
  },
  async upload({ context }, body) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      return await axios.post(api +  '/api/uploads/' + '/', body, headers, { timeout: timeOut });
    } catch (error) {
      throw error;
    }
  },
  setNewValues({ commit }, token) {
    try {
      let decodedUserData = JSON.parse(
        decodeURIComponent(
          atob(token.split('.')[1])
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      ).user;
      decodedUserData['token'] = token;
      commit('SET_NEW_VALUES', decodedUserData);
    } catch (error) {
      throw error;
    }
  },

  setDefaultValues({ commit }, refreshPage = false) {
    try {
      helperMethods.deleteCookie('token');
      helperMethods.deleteCookie('exposed_license_indexes');
      helperMethods.deleteCookie('not_exposed_notification_index');
      commit('SET_DEFAULT_VALUES');
      if (refreshPage === true) {
        helperMethods.refreshPage()
      }
    } catch (error) {
      throw error;
    }
  },
}
