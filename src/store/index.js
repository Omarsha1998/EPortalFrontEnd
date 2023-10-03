import { createStore, createLogger } from 'vuex';
import users from '../store/modules/UsersModule.js';

const debug = true;

const Store = createStore({
  modules: {
    users
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store
