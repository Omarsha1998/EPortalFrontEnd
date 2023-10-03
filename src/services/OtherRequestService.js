import axios from "axios";
import helperMethods from "../helperMethods.js";

export class OtherRequestService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/other-requests/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static approveRequest(employeeID, body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.put(this.serverURL + this.controllerName + 'approve-request/' + employeeID, body, headers, { timeout: this.timeOut });
  }

  static setHRRemarks(employeeID, body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.put(this.serverURL + this.controllerName + 'set-hr-remarks/' + employeeID, body, headers, { timeout: this.timeOut });
  }

  static requestNotHighLightedToHR(employeeID, body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.put(this.serverURL + this.controllerName + 'request-not-high-lighted-to-hr/' + employeeID, body, headers, { timeout: this.timeOut });
  }

}
