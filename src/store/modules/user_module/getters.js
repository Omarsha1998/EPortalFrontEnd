export default {
  token: (state) => state.token,
  employee_id: (state) => state.employee_id,
  employee_full_name: (state) => state.employee_full_name,
  has_work_experience: (state) => state.has_work_experience,
  is_license: (state) => state.is_license,
  is_pis_approver: (state) => state.access_rights.is_pis_approver,
  is_leave_approver: (state) => state.access_rights.is_leave_approver,
  getIsAdmin: (state) => state.isAdmin,
  has_all_values : (state) => {
   if (state.token !== null && state.employee_id !== null && state.employee_full_name !== null){
    return true;
   }
   return false;
  }
};