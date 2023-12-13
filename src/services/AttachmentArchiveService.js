import axios from "axios";
import helperMethods from "../helperMethods.js";

export class AttachmentArchiveService {
  static serverURL = process.env.BACKEND_REST_API_URL;
  static controllerName = '/api/attachment-archives/';
  static timeOut = process.env.BACKEND_REST_API_TIMEOUT;

  static getAllDepartments() {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.get(this.serverURL + this.controllerName + 'get-all-departments', headers , { timeout: this.timeOut });
  }

  static searchEmployee(departmentID, employeeIDOrEmployeeName) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.get(this.serverURL + this.controllerName + 'search-employee' + '?' +'departmentID=' + departmentID + '&' + 'employeeIDOrEmployeeName=' + employeeIDOrEmployeeName
    , headers , { timeout: this.timeOut });
  }

  static getEmployeeAttachments(employeeID) {
    const token = helperMethods.getCookie("token");
    const headers = { headers: { 'Authorization': 'Bearer ' + token } }
    return axios.get(this.serverURL + this.controllerName + 'get-employee-attachments' + '?' +'employeeID=' + employeeID, headers , { timeout: this.timeOut });
  }

}
