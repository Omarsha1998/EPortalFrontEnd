import axios from "axios";
import helperMethods from "../helperMethods.js";

export class LicenseService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/licenses/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static createRequest(body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.post(this.serverURL + this.controllerName + 'create-request', body, headers, { timeout: this.timeOut });
  }

}