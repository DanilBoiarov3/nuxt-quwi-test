export const state = () => ({
    token: null,
    isAuthorized: false,
    user: {}
})

export const mutations = {
    setToken(state, token) {
        state.token = token;
        state.isAuthorized = true;

        this.$axios.setHeader('Authorization', 'Bearer ' + token)
    },
    removeToken(state) {
        state.token = null;
        state.isAuthorized = false;
    },
    setUser(state, user) {
        state.user = user;
    },
    removeUser(state) {
        state.user = null;
    },
}

export const actions = {
    async login({commit}, {email, password}) {
        const {token, app_init: {user}} = await this.$axios.$post('/auth/login', {email, password});

        commit('setUser', user);
        commit('setToken', token);

        await this.$router.push('/projects')
    },
    async logout ({commit}) {
        await this.$axios.$post('/auth/logout');

        commit('removeUser')
        commit('removeToken')
    }
}

export const getters = {
    isAuthenticated: (state) => {
        return state.token && state.token !== ''
    },

}
