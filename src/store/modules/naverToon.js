import axios from 'axios';

const state = {
    searchResult: []
};

const getters = {
    storedTodoItems(state) {
        return state.searchResult
    }
};

const mutations = {
        searchAll(state) {
            const url = 'http://localhost:3000/search/all'
            axios
                .get(url)
                .then(response => {
                   state.searchResult = response.data;
                   console.log(state.searchResult);
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchTitle(state, payload) {
            const url = 'http://localhost:3000/search/title?title=' + payload.title;
            axios
                .get(url)
                .then(response => {
                   state.searchResult = response.data;
                   console.log(state.searchResult);
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchWeek(state, payload) {
            const url = 'http://localhost:3000/search/weekDay?weekDay=' + payload.week;
            axios
                .get(url)
                .then(response => {
                   state.searchResult = response.data;
                   console.log(state.searchResult);
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false;
                });
        }
};

export default {
    state,
    getters,
    mutations
}