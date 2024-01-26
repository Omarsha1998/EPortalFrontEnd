import axios from 'axios';
import { Cookies } from 'quasar';
const APIUrl = process.env.BACKEND_REST_API_URL;

export default {
  async submitLeaveRequest({ commit }, leaveRequestData) {
    try {
      const response = await axios.post(`${APIUrl}/leave/leave-request`, leaveRequestData, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      
      commit('SET_LEAVE_DATA', response.data); 
    } catch (error) {
      console.error('Error Requesting Leaves', error);
      throw error;
    };
  },

  async deleteLeaves({ commit }, LeaveID) {
    try {
      await axios.delete(`${APIUrl}/leave/delete-leave/${LeaveID}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
    } catch (error) {
      console.error('Error Deleting Leave Request', error);
      throw error;
    };
  },

  async updateLeaves({ commit }, updatedLeave ) {
    try {
      await axios.put(`${APIUrl}/leave/editleave-request/${updatedLeave.editLeaveID}`, updatedLeave, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` 
        },
      });

      commit('SET_UPDATE_LEAVE', updatedLeave);
    } catch (error) {
      console.error('Error Updating Leaves', error);
      throw error;
    };
  },

  async fetchLeaves({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/leave/leave-details`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      commit('SET_LEAVE_DETAILS', response.data);
    } catch (error) {
      console.error('Error Fetching Leaves History', error);
      
      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    }
  },

  async fetchleaveBalances({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/leave/leave-balance`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}`},
      });
      commit('SET_BALANCE_DETAILS', response.data)
    } catch (error) {
      console.error('Error Getting User Leave Balance', error);

      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    };
  },

  async fetchUserLeaveBalancesDetails({ commit, dispatch }, employeeID) {
    try {
      const response = await axios.get(`${APIUrl}/leave/user-leave-balance/${employeeID}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}`},
      });
      commit('SET_BALANCE_USERBALANCEDETAILS', response.data)
    } catch (error) {
      console.error('Error on Getting Leave Balances', error);
      // if(error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    };
  },

  async fetchForfeitedLeaves ({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/leave/forfeited-leave`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
  
      commit('SET_FORFEITED_DETAILS', response.data);
    } catch (error) {
      console.error('Error on getting Forfeited Leaves', error);
  
      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    };
  },

  // async handle403Error({ commit, dispatch}) {
  //   console.error('Handling 403 error counter...');
  //   commit('INCREMENT_403_ERRORS');
  
  //   if (state.numberOf403Errors === 1) {
  //     try {
  //       await dispatch('auth/clearUserDetails', null, { root: true});
  //       commit('RESET_403_ERRORS');
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     };
  //   };
  // },
  
  async fetchpendingLeaves ({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/leave/pending-leaves`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      
      commit('SET_PENDING_DETAILS', response.data);
    } catch (error) {
      console.log('Error Getting Pending Leaves', error);
      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    }
  },

  async fetchapprovedLeaves ({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/leave/approved-leaves`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      
      commit('SET_APPROVED_DETAILS', response.data);
    } catch (error) {
      console.log('Error Getting Approved Leaves', error);
      
      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    };
  },

  async fetchrejectedLeaves ({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/leave/rejected-leaves`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      
      commit('SET_REJECTED_DETAILS', response.data);
    } catch (error) {
      console.log('Error Getting Rejected Leaves', error);
      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    };
  },

  async approveLeaves({ commit }, LeaveID) {
    try {
      await axios.post(`${APIUrl}/leave/admin-action`, {
        LeaveID: LeaveID,
        Status: 'Approved',
      }, 
      {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });

    } catch (error) {
      console.error('Failed Approving The Leave', error);
      throw error;
    };
  },

  async rejectLeaves({ commit }, LeaveID) {
    try {
      await axios.post(`${APIUrl}/leave/admin-action`, {
        LeaveID: LeaveID,
        Status: 'Rejected',
      }, 
      {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });

    } catch (error) {
      console.error('Failed Rejecting The Leave', error);
      throw error;
    };
  },

  clearLeaveDetails({ commit }) {
    commit('CLEAR_LEAVE_DETAILS');
  },


  loadAndConvertToBase64({ commit }, logoPath) {
    
    const image = new Image();
    image.src = logoPath;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 0.10;
      context.drawImage(image, 0, 0);
      const base64 = canvas.toDataURL('image/png');
      context.globalAlpha = 1.0;

      commit('setBase64Image', base64);
    };
  },


};