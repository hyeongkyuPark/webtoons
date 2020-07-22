const state = {
    main: 'home',
    sub: {
        myToon: 'collecter',
        allToon: 'naver'
    }
}

const getters = {
    getMain(state){
       return state.main
    },
    getSub(state){
        return state.sub
    }
}

const mutations = {
    setMain(state, name) {
        state.sub.myToon = 'collecter';
        state.sub.allToon = 'naver';
        state.main = name;
    },
    setMySub(state, name) {
        state.sub.myToon = 'collecter';
        state.sub.allToon = 'naver';
        state.sub.myToon = name;
    },
    setAllSub(state, name) {
        state.sub.myToon = 'collecter';
        state.sub.allToon = 'naver';
        state.sub.allToon = name;
    }
}

export default {
    state,
    getters,
    mutations
}