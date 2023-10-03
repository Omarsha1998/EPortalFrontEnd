import axios from "axios";
import helperMethods from "../helperMethods.js";

export class UploadService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/uploads';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static index(body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.post(this.serverURL + this.controllerName + '/', body, headers, { timeout: this.timeOut });
  }
}
