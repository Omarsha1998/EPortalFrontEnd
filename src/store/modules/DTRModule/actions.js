import axios from 'axios';
import { Cookies } from 'quasar';
const APIUrl = process.env.BACKEND_REST_API_URL;

export default {

  async fetchDTR({ commit, dispatch }) {
    try {
      const response = await axios.get(`${APIUrl}/dtrdetails/getDTRDetails`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
  
      // Convert string representations to Date objects
      const dtrDetails = response.data.map(item => ({
        ...item,
        schedFrom: new Date(item.schedFrom),
        schedTo: new Date(item.schedTo),
        TimeIN: new Date(item.TimeIN)
      }));
  
      commit('SET_DTR_DETAILS', dtrDetails);
    } catch (error) {
      console.error('Error Fetching Announcement', error);
      throw error;
    }
  },
  


};