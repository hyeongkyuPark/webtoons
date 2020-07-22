<template>
  <div class="best-toon">
      <div class="best-toon-box">
          <div class="site-info">
              <div class="title">
                  <h2 style="color: rgb(15, 141, 224)">다음</h2>
                  <p>인기웹툰</p>
              </div>
          </div>
          <div class="slider">
                    <div @click="moveLeft" class="left-btn">
                         <font-awesome-icon icon="chevron-left" />
                    </div>
                    <ul class="best-items">
                        <li v-for="item in getDaumBestList" :key="item.length" 
                            class="best-item"
                            :style="{'transform': 'translateX('+computedItemX+')'}"
                            @click="hrefToon(item.url)"
                        >
                            <img class="toon-thumb" :src="item.thumb" alt="">
                            <h2 class="toon-title">{{item.title}}</h2>
                            <div class="toon-info">
                                <p class="toon-artists">{{item.artists}}</p>
                                <p class="toon-genre">{{item.genres}}</p>
                            </div>
                        </li>
                        
                    </ul>
                    <div @click="moveRight" class="right-btn">
                         <font-awesome-icon icon="chevron-right" />
                    </div>
            </div>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
    created() {
        this.getDaumBestItems()
    },
    data() {
        return {
            itemX: 0
        }
    },
    computed: {
        ...mapGetters([
            'getDaumBestList'
        ]),
        computedItemX() {
            return this.itemX + 'px'
        }
    },
    methods: {
        ...mapMutations([
            'getDaumBestItems'
        ]),
        moveLeft() {
            if(this.itemX < 0) {
                this.itemX += 190;
            }
        },
        moveRight() {
            if(this.itemX > -16*190) {
                this.itemX -= 190;
            }
        },
        hrefToon(url) {
            window.open(url);
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
    .best-toon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
    .best-toon-box {
        width: 950px;
        height: 270px;
        box-shadow: 
    1px 0 0 0 rgb(211, 211, 211), 
    0 1px 0 0 rgb(211, 211, 211), 
    1px 1px 0 0 rgb(211, 211, 211),
    1px 0 0 0 rgb(211, 211, 211) inset, 
    0 1px 0 0 rgb(211, 211, 211) inset;
        margin: 10px 0;
        display: flex;
    }
    .site-info {
        width: 150px;
        padding: 50px 10px;
        box-sizing: border-box;
        font-size: 22px;
        line-height: 1.4em;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: rgb(126, 126, 126);
    }
    .slider {
        width: 800px;
        height: 100%;
        display: flex;
    }
    .slider>div {
        width: 20px;
        height: 100%;
        box-sizing: border-box;
         box-shadow: 
    1px 0 0 0 rgb(211, 211, 211), 
    0 1px 0 0 rgb(211, 211, 211), 
    1px 1px 0 0 rgb(211, 211, 211),
    1px 0 0 0 rgb(211, 211, 211) inset, 
    0 1px 0 0 rgb(211, 211, 211) inset;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .best-items {
        width: 760px;
        height: 100%;
        display: flex;
        overflow: hidden;
    }
    .best-items>.best-item {
        cursor: pointer;
        width: 190px;
        height: 100%;
         box-shadow: 
    1px 0 0 0 rgb(211, 211, 211), 
    0 1px 0 0 rgb(211, 211, 211), 
    1px 1px 0 0 rgb(211, 211, 211),
    1px 0 0 0 rgb(211, 211, 211) inset, 
    0 1px 0 0 rgb(211, 211, 211) inset;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        transition: .5s;
    }
    .best-item > * {
        width: 170px;
    }
    .best-item > img {
        height: 170px;
    }
    .toon-title {
        font-size: 20px;
         margin-top: 10px;
        line-height: 1.5em;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .toon-introduction {
        display: block;
        height: 80px;
        margin-top: 10px;
        line-height: 1.3em;
        word-break: keep-all;
    }
    .toon-info {
        font-size: 12px;
        line-height: 1.4em;
        margin-top: auto;
    }
</style>