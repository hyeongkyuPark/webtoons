const state = {
    loginCheck: false
}

const getters = {
    getLoginCheck(state) {
        return state.loginCheck
    }
}

export default {
    state,
    getters
}