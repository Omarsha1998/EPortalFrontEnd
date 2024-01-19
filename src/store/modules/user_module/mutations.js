export default {
  SET_NEW_VALUES(state, data) {
    state.token = data.token;
    state.employee_id = data.employee_id;
    state.employee_full_name = data.employee_full_name;
    state.is_hr = data.is_hr;
    state.has_work_experience = data.has_work_experience;
    state.is_license = data.is_license;
    state.isAdmin = data.isAdmin;
  },
  SET_DEFAULT_VALUES(state) {
    state.token = null;
    state.employee_id = null;
    state.employee_full_name = null;
    state.is_hr = false;
    state.has_work_experience = false;
    state.is_license = false;
    state.isAdmin = false;
  },
};