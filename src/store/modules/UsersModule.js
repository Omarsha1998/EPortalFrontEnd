import { UserService } from '../../services/UserService.js';
import helperMethods from "../../helperMethods.js";
import Store from "../../store/index.js"

const state = {
    token: null,
    user: null,
};

const getters = {
    getToken: state => state.token,
    getUser: state => state.user,
    authenticated(state) {
        return state.token !== null && state.user !== null ? true : false;
    }
};

const actions = {
    async login({ commit }, credentials) {
        try {
            const response = await UserService.login(credentials, helperMethods.getDateRangeSearch());
            if (response.status === 200) {
                const numberOfDays = 3;
                let expires = helperMethods.addDays(helperMethods.getDateTimeToday(), numberOfDays);
                helperMethods.createCookie("token", response.data.token, expires);

                commit('setUser', response.data.user);
                commit('setToken', response.data.token);
            } else {
                commit('setDefault');
            }
        } catch (error) {
            helperMethods.showErrorMessage(error);
        }
    },
    async getUser({ commit }, dateRangeSearch = null) {
        try {
            const response = await UserService.getUser(state.token, helperMethods.getDateRangeSearch(dateRangeSearch));
            commit('setUser', response.data.user);
        } catch (error) {
            helperMethods.showErrorMessage(error);
            if (error.message === "Network Error" || error.message === "timeout of " + process.env.BACKEND_REST_API_TIMEOUT + "ms exceeded") {
                await Store.dispatch('logout');
            }
        }
    },
    getToken({ commit }) {
        let token = helperMethods.getCookie("token");
        token = token === undefined ? null : token;
        commit('setToken', token);
    },
    logout({ commit }) {
        helperMethods.deleteCookie("token");
        helperMethods.deleteCookie("exposed_license_indexes");
        helperMethods.deleteCookie("not_exposed_notification_index");
        commit('setDefault');
    },
};


const mutations = {
    setDefault: (state) => {
        state.token = null;
        state.user = null;
    },
    setUser: (state, user) => {
        user.licenses.forEach(function (obj) {
            obj.expiration_date = helperMethods.correctDate(obj.expiration_date);
        });
        state.user = user;
    },
    setToken: (state, token) => {
        state.token = token;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
