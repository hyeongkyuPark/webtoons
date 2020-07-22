import axios from 'axios';

const state = {
    naverBestList: []
}

const getters = {
    getNaverBestList(state) {
        return state.naverBestList;
    }
}

const mutations = {
    getNaverBestItems(state) {
        const url = 'http://localhost:3000/toon/naver'
            axios
                .get(url)
                .then(response => {
                   state.naverBestList = response.data;
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false;
                });
    }
}

export default {
    state,
    getters,
    mutations
}