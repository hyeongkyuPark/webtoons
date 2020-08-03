import Vue from 'vue';
import Vuex from 'vuex';
import naverToon from './modules/naverToon';
import login from './modules/login';
import nav from './modules/nav'
import todayToon from './modules/todayToon'
import daumBest from './modules/daumBest'
import naverBest from './modules/naverBest'
import searchAll from './modules/searchAll'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        naverToon,
        login,
        nav,
        todayToon,
        daumBest,
        naverBest,
        searchAll
    }
});