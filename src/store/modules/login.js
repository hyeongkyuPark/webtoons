const state = {
    loginCheck: false
}

const getters = {
    getLoginCheck(state) {
        return state.loginCheck
    }
}

const mutations = {
    setLoginCheck(state) {
        state.loginCheck = !state.loginCheck;
    }
}

export default {
    state,
    getters,
    mutations
}