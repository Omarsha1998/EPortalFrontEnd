export default {
  token: (state) => state.token,
  employee_id: (state) => state.employee_id,
  employee_full_name: (state) => state.employee_full_name,
  is_hr: (state) => state.is_hr,
  has_work_experience: (state) => state.has_work_experience,
  is_license: (state) => state.is_license,
  getIsAdmin: (state) => state.isAdmin,
  has_all_values : (state) => {
   if (state.token !== null && state.employee_id !== null && state.employee_full_name !== null){
    return true;
   }
   return false;
  }
};