import authService from './../services/auth-service.js';
import router from './../router.js';

//uzimamo usera iz localStorage i parsujemo ga
const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if(user) {
        return JSON.parse(user);
    }
};

export default {
    state: {
        user: getUserFromLocalStorage(),
        token: localStorage.getItem('token'), //uzimamo token iz localStorage
        errors: null,
    },

    mutations: {
        SET_ERRORS(state, payload) {
            state.errors = payload;
        },

        SET_DATA(state, { user, token }) {
            state.user = user;
            state.token = token;
            state.errors = null;
        }
    },

    actions: {
        async login({ commit }, { email, password }) {
            try {
                const { user, token } = await authService.login(email, password);
                localStorage.setItem('user', JSON.stringify(user)); //setujemo usera preko localStorage
                localStorage.setItem('token', token); //setujemo token preko localStorage
                authService.setAuthHeaders(token); //postavljamo headere tj token
                commit('SET_DATA', { user, token });
                router.push({ name: 'all-galleries' }); //redirektujemo korisnika
            } catch(error) {
                commit('SET_ERRORS', error.response);
            }
        },

        logout({ commit }) {
            authService.setAuthHeaders(); //skidamo headere
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            commit('SET_DATA', { user: null, token: null }); //postavljamo user i token na null
            router.push({ name: 'login' }); //redirektovanje
        }
    },

    getters: {
        getUser: state => state.user,
        getErrors: state => state.errors,
    }
}
