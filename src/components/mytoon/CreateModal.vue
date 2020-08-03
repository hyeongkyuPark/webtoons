<template>
  <div class="create-modal">
      <div class="modal-inner">
          <div class="modal-header">
              <div class="search-box">
                  <div class="search-types">
                        <div 
                            class="title"
                            :class="searchType == 'title'?'selected':''"
                            @click="titleClick"
                        >
                          제목
                        </div>
                        <div
                            class="week-day"
                            :class="searchType == 'week'?'selected':''"
                            @click="weekClick"
                        >요일</div>
                  </div>
                  <div class="search-form">
                      <div class="search-input" :class="searchType == 'title'?'':'display-none'">
                          <input id="title-input" type="text" v-model="searchTitle" placeholder="제목으로 검색하기">
                          <button @click="searchForTitle">검색</button>
                      </div>
                      <div class="week-day-input-wrap" :class="searchType == 'week'?'':'display-none'">
                        <ul id="week-day-input">
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'mon' ? 'selected':''"
                                @click="searchForWeek('mon')"
                            >
                                월
                            </li>
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'tue' ? 'selected':''"
                                @click="searchForWeek('tue')"
                            >
                                화
                            </li>
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'wed' ? 'selected':''"
                                @click="searchForWeek('wed')"
                            >
                                수
                            </li>
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'thu' ? 'selected':''"
                                @click="searchForWeek('thu')"
                            >
                                목
                            </li>
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'fri' ? 'selected':''"
                                @click="searchForWeek('fri')"
                            >
                                금
                            </li>
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'sat' ? 'selected':''"
                                @click="searchForWeek('sat')"
                            >
                                토
                            </li>
                            <li
                                class="week-day-item"
                                :class="searchWeek == 'sun' ? 'selected':''"
                                @click="searchForWeek('sun')"
                            >
                                일
                            </li>
                        </ul>
                      </div>
                  </div>
              </div>
          </div>
          <div class="modal-body">
              <div class="modal-body-wrap">
                <h2 class="page-title">내 웹툰 <span>등록</span></h2>
                <div class="underline"></div>
                <div class="content-box">
                    <ul class="search-items">
                        <li class="search-item-box" v-for="(item, idx) in getViewItems" :key="idx" @click="addCreateList(item.index)">
                            <div class="check-box">
                                <div class="checked">
                                    <font-awesome-icon :class="itemCheck(item.index)" icon="check"/>
                                </div>
                            </div>
                            <div class="search-item">
                                <img class="thumb" :src="item.imgUrl" alt="test">
                                <p>{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="paging-box">
                        <div class="page-left" @click="prevPagging()">
                            <font-awesome-icon icon="chevron-left" />
                        </div>
                        <ul class="pages">
                            <li v-for="(page, idx) in getPageCount" :key="idx" class="page-num" :class="getSelectPage==page?'select-page':''"  @click="setPage(page)">{{page}}</li>
                        </ul>
                        <div class="page-right" @click="nextPagging()">
                            <font-awesome-icon icon="chevron-right" />
                        </div>
                    </div>
                </div>
                <div class="add-box">
                    <div class="add-title">
                        <h2>등록<br/>리스트</h2>
                        <p>(총 {{this.getCreateListCount}}개)</p>
                    </div>
                    <div class="add-content">
                        <ul class="add-items">
                            <li class="add-item-box" v-for="(createItem, idx) in getCreateListView" :key="idx">
                                <div class="add-item">
                                <img class="thumb" :src="createItem.imgUrl" alt="test">
                                <p class="addCreateTitle">{{createItem.title}}</p>
                                </div>
                            </li>
                            <li class="addCount" :class="getCreateListCount > 4 ? '':'display-none'">
                                <p>+ {{this.getCreateListCount - 4}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="btn-box">
                        <button @click="goCollect">뒤로</button>
                        <button @click="postToon">등록</button>
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';

export default {
    created() {
        this.getSearchItemLists();
        
    },
    data() {
        return{
            searchType: 'title',
            searchWeek: 'mon',
            searchTitle: ''
        }
    },
    computed: {
        ...mapGetters([
            'getViewItems',
            'getPageCount',
            'getSelectPagging',
            'getPageCounter',
            'getSelectPage',
            'getCheckList',
            'getCreateList',
            'getCreateListView',
            'getCreateListCount'
        ])
    },
    methods: {
        ...mapMutations([
            'getSearchItemLists',
            'setPage',
            'setSelectPagging',
            'setChecked',
            'setSearchItemsWeek',
            'setCreateList',
            'setSearchItemsTitle',
            'setMySub',
            'postToon'
        ]),
        checkItem() {
            console.log(this);
        },
        nextPagging() {

            if(this.getSelectPagging*5 < this.getPageCounter) {
                let nextPagging = this.getSelectPagging + 1;
    
                this.setSelectPagging(nextPagging);
                this.setPage(nextPagging*5 - 4);
            }
        },
        prevPagging() {

            if(this.getSelectPagging > 1) {
                let prevPagging = this.getSelectPagging - 1;
    
                this.setSelectPagging(prevPagging);
                this.setPage(prevPagging*5 - 4);
            }
        },
        itemCheck(index) {
            let ok = {};

            for(let i=0; i<this.getCheckList.length; i++) {
                if(this.getCheckList[i].index == index) {
                    ok = this.getCheckList[i].checked;
                }
            }

            return ok?'':'display-none';
        },
        searchForWeek(week) {
            this.searchWeek = week;
            this.setSearchItemsWeek(week);
        },
        searchForTitle() {
            this.setSearchItemsTitle(this.searchTitle);
        }
        ,
        weekClick() {
            this.searchType = 'week';
            this.searchTitle = '';
            this.setSearchItemsWeek('mon');
        },
        titleClick() {
            this.searchType = 'title';
            this.searchWeek = 'mon';
            this.setSearchItemsWeek('');
        },
        addCreateList(index) {
            this.setChecked(index);
            this.setCreateList(index);
        },
        goCollect() {
            this.setMySub('collecter');
        }
    }
}
</script>

<style scoped>
    * {
    font-family: Arial;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select:none;

}

    .create-modal {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        background: rgba(53, 53, 53, 0.616);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-inner {
        width: 950px;
        height: 800px;
        background: white;
        border-radius: 50px;
    }

    .search-box {
        height: 100px;
        display: flex;

    }
    .search-types {
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .search-types>div {
        width: 80px;
        height: 40px;
        border: 1px solid rgb(195, 195, 195);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        border-radius: 10px;
        font-weight: bold;
    }
    
    .search-form {
        width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-input {
        width: 100%;
        display: flex;
        justify-content: center;

    }
     .search-input> #title-input {
         width: 80%;
         padding: 10px 10px 3px 10px;
         border: none;
         outline: none;
         border-bottom: 2px solid rgb(107, 107, 107);
     }

    .week-day-input-wrap {
        width: 100%;
    }

    .week-day-input-wrap > #week-day-input {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    #week-day-input > .week-day-item {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgb(158, 158, 158);
        box-sizing: border-box;
    }
    

    .display-none {
        display: none !important;
    }

    .display-none li {
        display: none;
    }

    .selected {
        border: none;
        background: rgb(73, 143, 255);
        color: white;
        border: none !important;
    }

    .modal-body {
        display: flex;
        justify-content: center;
    }
    .modal-body-wrap {
        width: 900px;
    }
    .page-title {
        font-size: 18px;
        font-weight: bold;
        color: rgb(143, 143, 143);
    }
    .page-title>span {
        color: black;
    }
    .modal-body .underline {
        width: 200px;
        height: 3px;
        margin-top: 10px;
        background: rgb(88, 88, 88);
    }
    .content-box {
        height: 450px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }
    .search-items {
        height: 420px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    .search-item-box {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .check-box {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        color: rgb(56, 230, 56);
        font-size: 25px;
    }

    

    .search-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 90%;
        height: 95%;
    }
    .search-item>p {
        text-align: center;
        font-weight: bold;
    }
    .paging-box {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .paging-box>div {
        width: 16px;
        height: 16px;
        text-align: center;
    }
    .pages {
        width: auto;
    }
    .page-num {
        display: inline-block;
        margin: 0 5px;
    }
    .thumb {
        width: 100%
    }
    

    .add-box {
        border: 1px solid black;
        height: 150px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .add-title {
        width: 150px;
    }
    .add-title>h2 {
        padding: 20px;
        font-size: 20px;
        line-height: 1.3em;
        font-weight: bold;
    }
    .add-title>p {
        padding: 0 20px;
    }
    .btn-box {
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .btn-box>button {
        height: 30px;
        margin-bottom: 5px;
        margin-right: 10px;
        outline: none;
        border: none;
        border-radius: 10px;
        background: rgb(121, 121, 121);
        color: white;
        font-size: 18px;
        font-weight: bold;
    }
    .btn-box>button:last-child {
        background: rgb(73, 143, 255);
    }
    .add-content {
        width: 600px;
        height: 100%;
    }
    .add-items {
        display: grid;
        height: 150px;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .add-item-box {
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .add-item {
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .add-item>img {
        width: 100%;
    }
    .add-item>p {
        text-align: center;
        font-size: 14px;
        margin-top: 5px;
    }

    .select-page {
        color: blue !important;
        font-weight: bold;
    }

    .addCreateTitle {
        overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
  height: 20px;
    }
    .addCount {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .addCount > p {
        font-size: 18px;
        background: rgb(44, 118, 255);
        padding: 10px 5px;
        border-radius: 30px;
        color: white;
        
    }
</style>