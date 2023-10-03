import axios from "axios";
import helperMethods from "../helperMethods.js";

export class MyRequestService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/my-requests/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static submitComply(employeeID, body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.put(this.serverURL + this.controllerName + 'submit-comply/' + employeeID, body, headers, { timeout: this.timeOut });
  }

  static requestNotHighLightedToRequester(employeeID, body) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.put(this.serverURL + this.controllerName + 'request-not-high-lighted-to-requester/' + employeeID, body, headers, { timeout: this.timeOut });
  }

}
