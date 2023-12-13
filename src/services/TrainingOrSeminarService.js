import axios from "axios";
import helperMethods from "../helperMethods.js";

export class TrainingOrSeminarService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/trainings-or-seminars/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static createRequest(body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.post(this.serverURL + this.controllerName + 'create-request', body, headers, { timeout: this.timeOut });
  }
}
