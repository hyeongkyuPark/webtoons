<template>
    <div class="today-toon">
        <div class="today-wrap">
            <div class="best-toon">
                <div class="today-title">
                    <h2>오늘의 <span>웹툰</span></h2>
                    <p>{{this.todayDate}}</p>
                </div>
                <div class="toon-slide">
                    <div class="thumb">
                        <img :src="getBigImg" :alt="getBigImgAlt">
                        <img class="site-logo" :src="getSiteLogo" alt="사이트 로고">
                    </div>
                    <div class="thumb-nav">
                        <div @click="prev" class="top-arrow">
                            <font-awesome-icon icon="chevron-up" />
                        </div>
                        <div class="nav-box">
                            <ul class="thumb-nav-items">
                                <li v-for="item in getTodayItems" :key="item.index" 
                                    @mouseover="setSelectedIndex(item.index)" 
                                    class="thumb-nav-item"
                                    :class="{'selected-item': item.index == getSelectedIndex}"
                                    :style="{'transform': 'translateY('+computedItemY+')'}"
                                >
                                    <img class="samll-img" :src="item.thumb"/>
                                </li>
                            </ul>
                        </div>
                        <div @click="next" class="bottom-arrow">
                            <font-awesome-icon icon="chevron-down" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="href-site">
                <h2>사이트 <span>바로가기</span></h2>
                <ul class="site-list">
                    <li class="site-tap naver"><a href="https://comic.naver.com/webtoon/weekday.nhn">네이버</a></li>
                    <li class="site-tap daum"><a href="http://webtoon.daum.net/">다음</a></li>
                    <li class="site-tap lezhin"><a href="https://www.lezhin.com/ko">레진코믹스</a></li>
                    <li class="site-tap toptoon"><a href="https://toptoon.com/">탑툰</a></li>
                    <li class="site-tap toomics"><a href="https://www.toomics.com/">투믹스</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapMutations} from 'vuex';

moment.lang('ko');

export default {
    created() {
        this.getItemList();
    },
    data() {
        return {
            todayDate: moment(new Date).format('MM월 DD일 dddd'),
            itemY: 0
        }
    },
    computed: {
        ...mapGetters([
            'getSelectedIndex',
            'getTodayItems',
            'getBigImg',
            'getBigImgAlt',
            'getSiteLogo'
        ]),
        computedItemY() {
            return this.itemY + "px";
        }
    },
    methods: {
        ...mapMutations([
            'setSelectedIndex',
            'nextIndex',
            'prevIndex',
            'getItemList'
        ]),
        prev() {
            if(this.itemY < 0) {
                this.itemY += 51.3;
            }
            this.prevIndex();
        },
        next() {
            if(this.itemY > -((this.getTodayItems.length - 3) * 51.3)) {
                this.itemY -= 51.3;
            }
            this.nextIndex();
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
    .today-toon {
        display: flex;
        justify-content: center;
    }
    .today-wrap {
        width: 950px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }
    .best-toon {
        border: 1px solid rgb(211, 211, 211);
        width: 714px;
        height: 252px;
        box-sizing: border-box;
    }
    .today-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 17px;
    }
    .today-title>h2 {
        font-size: 20px;
        font-weight: bold;
        color: rgb(126, 126, 126);
    }
    .today-title>h2 span {
        color: black;
    }
    .today-title>p {
        font-size: 14px;
    }
    .toon-slide {
        display: flex;
    }
    .toon-slide .thumb {
        border-top: 1px solid rgb(211, 211, 211);
        width: 582px;
        height: 195px;
        box-sizing: border-box;
        position: relative;
    }
    .thumb>.site-logo {
        position: absolute;
        width: 100px;
        top: 10px;
        right: 10px;
    }
    .toon-slide .thumb-nav {
        border-top: 1px solid rgb(211, 211, 211);
        border-left: 1px solid rgb(211, 211, 211);
        box-sizing: border-box;
        width: 132px;
        height: 195px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .thumb-nav>div[class$='arrow'] {
        height: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .thumb-nav div:first-child {
        border-bottom: 1px solid rgb(211, 211, 211);
        box-sizing: border-box;
    }
    .nav-box {
        height: 153px;
    }
    .thumb-nav-items {
        height: 100%;
        overflow: hidden;
    }
    .thumb-nav-items>.thumb-nav-item {
        height: 51.3px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgb(211, 211, 211);
        box-sizing: border-box;
        transition: transform .5s;
    }
    .thumb-nav-item .samll-img {
        height: 100%;
    }
    .thumb-nav-item .nav-text {
        width: 100px;
        height: 48px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.1rem;
        font-weight: bold;
    }
    .nav-text>h2 {
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
    }

    .nav-text>p {
        font-size: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
        color: rgb(172, 172, 172);
    }

    .selected-item {
        border: 2px solid rgb(0, 0, 0) !important;
        box-sizing: border-box;
    }

    .href-site {
        border: 1px solid rgb(211, 211, 211);
        width: 220px;
        height: 252px;
        box-sizing: border-box;
    }
    .href-site>h2 {
        padding: 18px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(126, 126, 126);
    }
    .href-site>h2 span {
        color: black;
    }
    .site-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .site-list li {
        height: 40px;
        padding: 5px 10px;
        text-indent: -9999px;
    }
    .site-tap a {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .site-tap.naver a {
        background: url('../../assets/images/site/naver.png');
        background-size: 100% 100%;
    }
    .site-tap.daum a {
        background: url('../../assets/images/site/daum.png');
        background-size: 100% 100%;
    }
    .site-tap.lezhin a {
        background: url('../../assets/images/site/lezhin.png');
        background-size: 100% 100%;
    }
    .site-tap.toptoon a {
        background: url('../../assets/images/site/toptoon.png');
        background-size: 100% 100%;
    }
    .site-tap.toomics a {
        background: url('../../assets/images/site/toomics.png');
        background-size: 100% 100%;
    }

</style>