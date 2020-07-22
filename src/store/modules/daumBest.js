import axios from 'axios';

const state = {
    daumBestList: []
}

const getters = {
    getDaumBestList(state) {
        return state.daumBestList;
    }
}

const mutations = {
    getDaumBestItems(state) {
        const url = 'http://localhost:3000/toon/daum'
            axios
                .get(url)
                .then(response => {
                   state.daumBestList = response.data;
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