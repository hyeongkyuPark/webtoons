import axios from 'axios';

const state = {
    contentUrl: '',
    contentDetail: {},
    allContent: [],
    page: 1,
    pagging: 1,
    bookmark: 1,
    contentVisible: false
}

const getters = {
    getPage(state) {
        return state.page;
    },
    getContentDetail(state) {
        return state.contentDetail;
    },
    getContentUrl(state) {
        return state.contentUrl;
    },
    getAllContent(state) {
        return state.allContent;
    },
    getMarkContent(state) {
        
        let markContent = state.allContent.filter(item => {
            return parseInt(item.num) >= state.bookmark;
        });

        let result = markContent.splice((state.page - 1)*10, 10);


        return result;
    },
    getContentVisible(state) {
        return state.contentVisible;
    },
    getAllPage(state) {

        let result = [];

        for(let i = 1; i <= Math.ceil(state.allContent.length/10); i++) {
            result.push(i);
        }

        return result;
    },
    getPagging(state) {
        let totalPage = Math.ceil(state.allContent.length/10);

        let start = (state.pagging-1)*10+1

        let resultArr = [];

        for(let i = start; i < start+10; i++) {
            if(i > totalPage) {
                break;
            } else {
                resultArr.push(i);
            }
        }

        return resultArr;

    }
}

const mutations = {
    setContentDetail(state, content) {
        state.contentDetail = content;
    },
    setContentUrl(state, url) {
        state.contentUrl = url;
    },
    setBookmark(state, bookmark) {
        state.bookmark = bookmark;
    },
    setAllContent(state, allContent) {
        state.allContent = allContent.data.filter(item => {
            return parseInt(item.num) >= state.bookmark;
        });
    },
    openModal(state) {
        state.contentVisible = true;
    },
    closeModal(state) {
        state.contentVisible = false;
    },
    resetPagging(state) {
        state.page = 1;
        state.pagging = 1;
    },
    prevPagging(state) {
        if(state.pagging > 1) {
            state.pagging -= 1;
            state.page = (state.pagging*10) - 9;
        }
    },
    nextPagging(state) {
        if(state.pagging < Math.ceil(state.allContent.length/10/10)) {
            state.pagging += 1;
            state.page = (state.pagging*10) - 9;
        }
    },
    setPage(state, page) {
        state.page = page;
    }
}

const actions = {
    async allContentLoader({commit, state}, {bookmark, url, content}) {
        commit('setContentUrl', url);
        commit('setBookmark', bookmark);
        commit('setContentDetail', content);
        commit('resetPagging');
        commit('setAllContent', await axios.get('http://localhost:3000/search/detail?url=' + state.contentUrl));
        commit('openModal');
    },
    async updateContent({commit, state}, content) {
        console.log(state.bookmark);
        commit('setContentDetail', content);
        commit('setAllContent', {data: state.allContent});
        console.log('end');
    },
    async updateBookmark({commit}, {num, no}) {
        let newBookmark = num;

        commit('setBookmark', newBookmark);

        await axios.post('http://localhost:3030/mytoon/bookmark', {newBookmark, no});

    }
}


export default {
    state,
    getters,
    mutations,
    actions
}