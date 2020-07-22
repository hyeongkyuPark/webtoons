import axios from 'axios';

const state = {
    todayItems: [],
    selectedIndex: 1,
    bigImg: '',
    bigImgAlt: '',
    siteLogo: ''
};

const getters = {
    getSelectedIndex(state) {
        return state.selectedIndex;
    },
    getTodayItems(state) {
        return state.todayItems;
    },
    getBigImg(state) {
        return state.bigImg;
    },
    getBigImgAlt(state) {
        return state.bigImgAlt;
    },
    getSiteLogo(state) {
        return state.siteLogo;
    }
};

const mutations = {
    setSelectedIndex(state, index) {
        state.selectedIndex = Number.parseInt(index);
        state.bigImg = state.todayItems[state.selectedIndex-1].bigImg;
    },
    prevIndex(state) {
        if(state.selectedIndex > 1) {
            state.selectedIndex -= 1;
            state.bigImg = state.todayItems[state.selectedIndex-1].bigImg;
        }
    },
    nextIndex(state) {
        if(state.selectedIndex < state.todayItems.length) {
            state.selectedIndex += 1;
            state.bigImg = state.todayItems[state.selectedIndex-1].bigImg;
        }
    },
    getItemList(state) {
        const url = 'http://localhost:3000/today/toon'
            axios
                .get(url)
                .then(response => {
                    state.bigImg = response.data[0].bigImg;
                    state.bigImgAlt = response.data[0].bigImgAlt;
                    if(response.data[0].site == 'naver') {
                        state.siteLogo = require('../../assets/images/site/naver.png');
                    }
                   state.todayItems = response.data;
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