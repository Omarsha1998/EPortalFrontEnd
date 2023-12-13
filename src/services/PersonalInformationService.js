import axios from "axios";
import helperMethods from "../helperMethods.js";

export class PersonalInformationService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/personal-informations/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static createRequest(body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.post(this.serverURL + this.controllerName + 'create-request', body, headers, { timeout: this.timeOut });
  }

  static getAllReligions() {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.get(this.serverURL + this.controllerName + 'get-all-religions', headers , { timeout: this.timeOut });
  }

  static getAllCivilStatuses() {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.get(this.serverURL + this.controllerName + 'get-all-civil-statuses', headers , { timeout: this.timeOut });
  }
}
