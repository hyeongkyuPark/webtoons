import axios from 'axios';

const state = {
    allToon : []
};


const getters = {
    getAllToonWeek(state) {
        return state.allToon;
    },
    getMondayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'mon';
        });


        return arr;
    },
    getTuedayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'tue';
        });


        return arr;
    },
    getWeddayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'wed';
        });


        return arr;
    },
    getThudayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'thu';
        });


        return arr;
    },
    getFridayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'fri';
        });


        return arr;
    },
    getSatdayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'sat';
        });


        return arr;
    },
    getSundayToon(state) {
        let arr = state.allToon.filter(item => {
            return item.mytoonWeekday == 'sun';
        });


        return arr;
    },
    getNewToon(state) {
        let temp = state.allToon.slice(0,state.allToon.length);
        let newToon = temp.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return newToon.slice(0,3);
    }
};

const mutations = {
    setAllToon(state, userId) {
        const url = 'http://localhost:3030/mytoon/id?userId=' + userId;
            axios
                .get(url)
                .then(response => {
                    state.allToon = response.data;
                });
    }
}

export default {
    state,
    getters,
    mutations
}