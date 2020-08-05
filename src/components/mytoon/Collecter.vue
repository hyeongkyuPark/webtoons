<template>
  <div class="mytoon-colloect">
      <DetailModal v-if="getContentVisible"/>
      <div class="mytoon-collect-wrap">
        <div class="new-mytoon">
          <h2>신규 등록 웹툰</h2>
          <ul class="new-items">
            <li class="new-item">

            </li>
            <li class="new-item">

            </li>
            <li class="new-item">

            </li>
          </ul>
        </div>
        <div class="box">
      </div>
        <div class="mytoon-list">
          <h2>웹툰 몰아보기</h2>
          <ul class="weekday-select">
            <li :class="selectNav == 'mon' ? 'selected':''" @click="setWeekday('mon')">월</li>
            <li :class="selectNav == 'tue' ? 'selected':''" @click="setWeekday('tue')">화</li>
            <li :class="selectNav == 'wed' ? 'selected':''" @click="setWeekday('wed')">수</li>
            <li :class="selectNav == 'thu' ? 'selected':''" @click="setWeekday('thu')">목</li>
            <li :class="selectNav == 'fri' ? 'selected':''" @click="setWeekday('fri')">금</li>
            <li :class="selectNav == 'sat' ? 'selected':''" @click="setWeekday('sat')">토</li>
            <li :class="selectNav == 'sun' ? 'selected':''" @click="setWeekday('sun')">일</li>
          </ul>
          <ul class="collect-items">
            <li class="collect-item" v-for="(item, idx) in getWeekToon()" :key="idx" @click="openModal({bookmark: item.mytoonBookmark+1, url: item.mytoonUrl, content: item})">
              <div class="collect-item-wrap">

                <img class="img-box" :src="item.mytoonThumb">

                <div class="text-box">
                  <p class="title">{{item.mytoonTitle}}</p>
                  <p class="writer">{{item.mytoonWriter}}</p>
                  <p class="site">(네이버)</p>
                  <p class="bookmark">볼 회차 : {{item.mytoonBookmark + 1}}화</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import DetailModal from './DetailModal'
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  components: {
    DetailModal
  },
  data() {
    return {
      selectNav: 'mon'
    }
  },
  created() {
    let cookie = document.cookie.match(/[userID]=([a-z A-Z 0-9]*)/)[1];
    this.setAllToon(cookie);
  },
  computed: {
    ...mapGetters([
      'getAllToonWeek',
      'getMondayToon',
      'getTuedayToon',
      'getWeddayToon',
      'getThudayToon',
      'getFridayToon',
      'getSatdayToon',
      'getSundayToon',
      'getContentVisible'
    ]),
    getSelectNav() {
      return this.selectNav;
    }
  },
  methods: {
    ...mapActions([
      'allContentLoader'
    ]),
    ...mapMutations([
      'setAllToon'
    ]),
    goWebToon(url) {
      window.open(url);
    },
    setWeekday(weekday) {
      this.selectNav = weekday;
    },
    getWeekToon() {
      let result;

      switch(this.selectNav) {
        case 'mon' :
          result = this.getMondayToon;
          break;
        case 'tue' :
          result = this.getTuedayToon;
          break;
        case 'wed' :
          result = this.getWeddayToon;
          break;
        case 'thu' :
          result = this.getThudayToon;
          break;
        case 'fri' :
          result = this.getFridayToon;
          break;
        case 'sat' :
          result = this.getSatdayToon;
          break;
        default :
          result = this.getSundayToon;
          break;
      }

      return result;
    },
    openModal(payload) {
      console.log(payload);
      this.allContentLoader(payload);
    }
  }
}
</script>

<style scoped>
  .box {
    height: 120px;
    border: 1px solid;
    margin: 30px 0;
  }

  .mytoon-colloect {
    display: flex;
    justify-content: center;
  }

  .mytoon-collect-wrap {
    width: 950px;
    display: flex;
    flex-direction: column;
  }

  .new-mytoon {
    margin-top: 20px;
    height: 260px;
  }

  .new-mytoon > h2 {
    width: 50%;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 2px solid;
  }

  .new-mytoon > .new-items {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .new-items > .new-item {
    width: 300px;
    height: 220px;
    border: 1px solid;
    padding: 10px;
    box-sizing: border-box;
  }

  .mytoon-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mytoon-list>h2 {
    align-self: flex-start;
    font-size: 20px;
    font-weight: bold;
  }

  .weekday-select {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  .weekday-select>li {
    margin: 20px 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: rgb(146, 146, 146);
    color: white;
    font-weight: bold;
  }
  .collect-items {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .collect-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }

  .collect-item-wrap {
    width: 95%;
    border: 1px solid rgb(155, 155, 155);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .collect-item-wrap > .img-box {
    width: 100%;
    height: 150px;
  }

  .collect-item-wrap > .text-box {
    width: 100%;

  }

  .collect-item-wrap > .text-box > .writer {
    margin-top: 10px;
    height: 14px;
  }

  .collect-item-wrap > .text-box > .title {
    margin-top: 10px;
    line-height: 1em;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  height: 16px;
  }

  .collect-item-wrap > .text-box > p:not(.title) {
    line-height: 1.3em;
    font-size: 14px;
  }

  .selected {
    background: rgb(0, 132, 255) !important;
    color: white;
    font-weight: bold;
  }
</style>