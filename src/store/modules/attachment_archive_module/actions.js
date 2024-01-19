import axios from 'axios';
import { Cookies } from 'quasar';
import helperMethods from 'src/helperMethods';

let api = process.env.BACKEND_REST_API_URL;
let controllerName = '/api/attachment-archives/';
let timeOut = process.env.BACKEND_REST_API_TIMEOUT;

export default {
  async getAllDepartments() {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      return await axios.get(api + controllerName + 'get-all-departments', headers, { timeout: timeOut });
    } catch (error) {
      throw error;
    }
  },
  async searchEmployee(context, { departmentID, employeeIDOrEmployeeName }) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
      return await axios.get(api + controllerName + 'search-employee' + '?' + 'departmentID=' + departmentID + '&' + 'employeeIDOrEmployeeName=' + employeeIDOrEmployeeName
        , headers, { timeout: timeOut });
    } catch (error) {
      throw error;
    }
  },
  async getEmployeeAttachments(context, employeeID) {
    try {
      const token = helperMethods.getCookie('token');
      const headers = { headers: { 'Authorization': 'Bearer ' + token } }
     return await axios.get(api + controllerName + 'get-employee-attachments' + '?' +'employeeID=' + employeeID, headers , { timeout: timeOut });
    } catch (error) {
      throw error;
    }
  },
}
