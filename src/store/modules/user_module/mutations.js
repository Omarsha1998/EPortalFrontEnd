export default {
  SET_NEW_VALUES(state, data) {
    state.token = data.token;
    state.employee_id = data.employee_id;
    state.employee_full_name = data.employee_full_name;
    state.has_work_experience = data.has_work_experience;
    state.is_license = data.is_license;
    state.access_rights.is_pis_approver = data.access_rights.is_pis_approver;
    state.access_rights.is_leave_approver = data.access_rights.is_leave_approver;
  },
  SET_DEFAULT_VALUES(state) {
    state.token = null;
    state.employee_id = null;
    state.employee_full_name = null;
    state.has_work_experience = false;
    state.is_license = false;
    state.access_rights.is_pis_approver = false;
    state.access_rights.is_leave_approver = false;
    state.isAdmin = false;
  },
};
