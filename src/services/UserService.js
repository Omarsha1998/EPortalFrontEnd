import axios from "axios";

export class UserService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/users/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static login(credentials, dateRangeSearch) {
    const body = { "employee_id":  credentials.employee_id, "password" : credentials.password, "date_range_search" : dateRangeSearch }
    return axios.post(this.serverURL + this.controllerName + 'login', body, { timeout: this.timeOut })
  }

  static getUser(token, dateRangeSearch) {
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    const body = { "token": token , "date_range_search" : dateRangeSearch }
    return axios.post(this.serverURL + this.controllerName + 'get-user', body, headers, { timeout: this.timeOut });
  }
}
