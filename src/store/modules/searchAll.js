import axios from 'axios';

const state = {
    allItems: [],
    searchItems: [],
    viewItems: [],
    pageCount: 0,
    selectPage: 1,
    selectPagging: 1,
    checkList: [],
    createList: [],
    createListCount: 0
}

const getters = {
    getSearchItems(state) {
        return state.searchItems;
    },
    getViewItems(state) {
        return state.viewItems;
    },
    getPageCount(state) {

        if (state.pageCount == 0) {
            return [1];
        }

        let countArr = [];

        for (let i = 0; i < state.pageCount; i++) {
            countArr.push(i + 1);
        }


        let resultArr = [];
        let end = state.selectPagging * 5;

        for (let i = end - 5; i < end; i++) {
            if (i >= countArr.length) {
                break;
            }
            resultArr.push(countArr[i]);
        }

        return resultArr;
    },
    getPageCounter(state) {
        return state.pageCount;
    },
    getSelectPagging(state) {
        return state.selectPagging;
    },
    getSelectPage(state) {
        return state.selectPage;
    },
    getCheckList(state) {
        return state.checkList;
    },
    getCreateListView(state) {

        let createListResult = [];

        if (state.createListCount <= 4) {
            return state.createList;
        } else {
            for (let i = 0; i < 4; i++) {
                createListResult.push(state.createList[i]);
            }

            return createListResult;
        }


    },
    getCreateListCount(state) {
        return state.createListCount;
    },
    getCreateList(state) {
        return state.createList;
    }
};

const mutations = {
    getSearchItemLists(state) {

        state.searchItems = [];
        state.viewItems = [];
        state.pageCount = 0;
        state.selectPage = 1;
        state.selectPagging = 1;
        state.checkList = [];
        state.createList = [];
        state.createListCount = 0;

        if (state.allItems.length == 0) {
            const url = 'http://localhost:3000/search/all'
            axios
                .get(url)
                .then(response => {
                    state.allItems = response.data;
                    state.searchItems = response.data;

                    response.data.forEach((item) => {
                        state.checkList.push({
                            index: item.index,
                            checked: item.checked
                        });
                    });

                    if (response.data.length % 10 == 0) {
                        state.pageCount = parseInt(response.data.length / 10);
                    } else {
                        state.pageCount = parseInt(response.data.length / 10) + 1;
                    }
                    let result = [];


                    for (let i = 0; i < 10; i++) {
                        result.push(state.searchItems[i]);
                    }

                    state.viewItems = result;
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false;
                });
        } else {
            state.searchItems = state.allItems;

                    state.allItems.forEach((item) => {
                        state.checkList.push({
                            index: item.index,
                            checked: item.checked
                        });
                    });

                    if (state.allItems.length % 10 == 0) {
                        state.pageCount = parseInt(state.allItems.length / 10);
                    } else {
                        state.pageCount = parseInt(state.allItems.length / 10) + 1;
                    }
                    let result = [];


                    for (let i = 0; i < 10; i++) {
                        result.push(state.searchItems[i]);
                    }

                    state.viewItems = result;
        }
    },
    setPage(state, page) {
        let result = [];

        let end = page * 10;

        state.selectPage = page;



        if (state.pageCount != state.selectPage) {
            for (let i = end - 10; i < end; i++) {
                result.push(state.searchItems[i]);
            }
        } else {
            for (let i = end - 10; i < state.searchItems.length; i++) {
                result.push(state.searchItems[i]);
            }
        }


        state.viewItems = result;
    },
    setSelectPagging(state, pagging) {
        state.selectPagging = pagging;
    },
    setChecked(state, index) {
        state.checkList[index].checked = !state.checkList[index].checked;
    },
    setSearchItemsWeek(state, week) {

        if (week != "") {
            state.searchItems = state.allItems.filter((item) => {
                return item.weekDay == week;
            });
        } else {
            state.searchItems = state.allItems;
        }


        state.selectPage = 1;
        state.selectPagging = 1;
        if (state.searchItems.length % 10 == 0) {
            state.pageCount = parseInt(state.searchItems.length / 10);
        } else {
            state.pageCount = parseInt(state.searchItems.length / 10) + 1;
        }

        let result = [];

        for (let i = 0; i < 10; i++) {
            result.push(state.searchItems[i]);
        }

        state.viewItems = result;
    },
    setCreateList(state, index) {
        if (state.checkList[index].checked) {
            state.createList.push(state.allItems[index]);
            state.createListCount++;
        } else {
            state.createList.splice(state.createList.findIndex(item => item.index == index), 1);
            state.createListCount--;
        }
    },
    setSearchItemsTitle(state, title) {
        if (title != "") {
            state.searchItems = state.allItems.filter((item) => {
                return item.title.indexOf(title) != -1;
            });
        } else {
            state.searchItems = state.allItems;
        }

        let result = [];
        if (state.searchItems.length > 10) {
            state.selectPage = 1;
            state.selectPagging = 1;
            if (state.searchItems.length % 10 == 0) {
                state.pageCount = parseInt(state.searchItems.length / 10);
            } else {
                state.pageCount = parseInt(state.searchItems.length / 10) + 1;
            }
            for (let i = 0; i < 10; i++) {
                result.push(state.searchItems[i]);
            }
        } else {
            state.selectPage = 1;
            state.selectPagging = 0;
            state.pageCount = 0;
            for (let i = 0; i < state.searchItems.length; i++) {
                result.push(state.searchItems[i]);
            }
        }

        state.viewItems = result;

    },
    postToon(state) {
        let userId = document.cookie.match(/[userID]=([a-z A-Z 0-9]*)/)[1];

        axios.post('http://localhost:3030/mytoon', {list: state.createList, id: userId});
    }
};


export default {
    state,
    getters,
    mutations
}