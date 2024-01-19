import axios from 'axios';
import { Cookies } from 'quasar';
const APIUrl = process.env.BACKEND_REST_API_URL;

export default {

  async fetchAnnouncements({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/announcement/getannouncements`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      commit('SET_ANNOUNCEMENTS', response.data);
    } catch (error) {
      console.error('Error Fetching Announcement', error);
      
      // if (error.response.status === 403) {
      //   await dispatch('handle403Error');
      // };
      throw error;
    }
  },


};