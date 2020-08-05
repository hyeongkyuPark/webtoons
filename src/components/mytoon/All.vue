<template>
  <div class="all-toon">
    <div class="all-toon-wr">

      <div class="all-toon-nav">
        <ul class="nav-items">
          <li @click="setWeekday('all')" class="nav-item" :class="getSelectNav=='all' ? 'selected': ''">요일전체</li>
          <li @click="setWeekday('mon')" class="nav-item" :class="getSelectNav=='mon' ? 'selected': ''">월요웹툰</li>
          <li @click="setWeekday('tue')" class="nav-item" :class="getSelectNav=='tue' ? 'selected': ''">화요웹툰</li>
          <li @click="setWeekday('wed')" class="nav-item" :class="getSelectNav=='wed' ? 'selected': ''">수요웹툰</li>
          <li @click="setWeekday('thu')" class="nav-item" :class="getSelectNav=='thu' ? 'selected': ''">목요웹툰</li>
          <li @click="setWeekday('fri')" class="nav-item" :class="getSelectNav=='fri' ? 'selected': ''">금요웹툰</li>
          <li @click="setWeekday('sat')" class="nav-item" :class="getSelectNav=='sat' ? 'selected': ''">토요웹툰</li>
          <li @click="setWeekday('sun')" class="nav-item" :class="getSelectNav=='sun' ? 'selected': ''">일요웹툰</li>
        </ul>
      </div>
      <div class="box">
      </div>
      <div v-if="getSelectNav == 'all'" class="all-weeks">
        <ul class="all-week-items">
          <p>월요웹툰</p>
          <li v-for="(toon, idx) in getMondayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
        <ul class="all-week-items">
          <p>화요웹툰</p>
          <li v-for="(toon, idx) in getTuedayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
        <ul class="all-week-items">
          <p>수요웹툰</p>
          <li v-for="(toon, idx) in getWeddayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
        <ul class="all-week-items">
          <p>목요웹툰</p>
          <li v-for="(toon, idx) in getThudayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
        <ul class="all-week-items">
          <p>금요웹툰</p>
          <li v-for="(toon, idx) in getFridayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
        <ul class="all-week-items">
          <p>토요웹툰</p>
          <li v-for="(toon, idx) in getSatdayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
        <ul class="all-week-items">
          <p>일요웹툰</p>
          <li v-for="(toon, idx) in getSundayToon" :key="idx" class="all-week-item" @click="goWebToon(toon.mytoonUrl)">
            <img :src="toon.mytoonThumb" class="item-img">
            <p class="item-title">{{toon.mytoonTitle}}</p>
          </li>
        </ul>
      </div>
      <div v-else class="select-weeks">
          <ul class="weekday-items">
            <li v-for="(item, idx) in getWeekToon()" :key="idx" class="weekday-item" @click="goWebToon(item.mytoonUrl)">
              <img :src="item.mytoonThumb" class="img-box">
              <div class="text-box">
                <p class="title">{{item.mytoonTitle}}</p>
                <p class="writer">{{item.mytoonWriter}}</p>
                <p class="site">(네이버)</p>
              </div>
            </li>
          </ul>
      </div>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  data() {
    return {
      selectNav: 'all'
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
      'getSundayToon'
    ]),
    getSelectNav() {
      return this.selectNav;
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
  .all-toon {
    display: flex;
    justify-content: center;
  }

  .all-toon-nav {
    width: 950px;
    display: flex;
  }
  
  .all-toon-nav>.nav-items {
    width: 100%;
    display: flex;
    justify-content: left;
    border-bottom: 1px solid rgb(172, 172, 172);
  }


  .all-toon-nav>.nav-items>.nav-item {
    padding: 30px 20px 10px 20px;
    font-size: 14px;
  }

  .nav-item.selected {
    font-weight: bold;
    border-bottom: 2px solid rgb(0, 183, 255);
  }
  .all-weeks {
    width: 950px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  .all-week-items {
    display: flex;
    flex-direction: column;
  }



  .all-week-items > p {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    font-weight: bold;
    color: rgb(144, 144, 144);
    border-top:1px solid slategray;
    border-bottom:1px solid slategray;
    margin-bottom: 10px;
  }

  .all-week-item {
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .all-week-item > .item-img {
    width: 110px;
    height: 110px;

  }

  .all-week-item > .item-title {
      font-size: 14px;
      padding: 5px 0 10px 0;
      overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
  height: 14px;
  text-align: center;
  }

  .box {
    height: 120px;
    border: 1px solid;
    margin: 30px 0;
  }
  

  .weekday-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .weekday-item {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .weekday-item > .img-box {
    width: 120px;
    height: 120px;
  }
  .weekday-item > .text-box {
    font-size: 14px;
    font-weight: bold;
  }
  .weekday-item > .text-box > .title {
    text-overflow: ellipsis;
  white-space: nowrap;
  width: 90px;
  height: 14px;
    overflow: hidden;
    
  }
  .weekday-item > .text-box >.writer {
    text-overflow: ellipsis;
  white-space: nowrap;
  width: 90px;
  height: 13px;
  font-size: 13px;
    overflow: hidden;
     margin-top: 5px;
     font-weight: normal;
  }
  .weekday-item > .text-box > .site {
    margin-top: 15px;
  }
</style>