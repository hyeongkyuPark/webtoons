<template>
  <div class="detail-modal">
      <div class="close-btn">
          <font-awesome-icon icon="times-circle" @click="closeModal()"/>
      </div>
      <div class="detail-modal-inner">
          <div class="content">
              <div class="content-header">
                  <img :src="getContentDetail.mytoonThumb" class="content-img">
                  <div class="content-text-box">
                      <div class="title-box">
                        <h2 class="title">{{getContentDetail.mytoonTitle}}</h2>
                        <p class="writer">{{getContentDetail.mytoonWriter}}</p>
                      </div>
                      <div class="description">
                          <p>{{getContentDetail.mytoonDescription}}</p>
                      </div>
                      <div class="grade">
                          <p>{{getContentDetail.mytoonGenre}} | {{getContentDetail.mytoonAge}}</p>
                      </div>

                  </div>
                  <a class="site"></a>
              </div>
              <div class="box"></div>
              <div class="content-body">
                  <div class="content-name">
                      <ul class="name-box">
                          <li class="image-name">이미지</li>
                          <li class="name-name">제목</li>
                          <li class="date-name">등록일</li>
                      </ul>
                  </div>
                  <div class="content-box">
                      <ul class="content-items">
                          <li @click="goToon(item.url)" class="content-item" v-for="(item, idx) in getMarkContent" :key="idx">
                            <div class="img-box">
                                <img class="img" :src="item.thumb">
                            </div>
                            <p class="title">{{item.title}}</p>
                            <p class="date">등록일</p>
                        </li>

                      </ul>
                      
                  </div>
              </div>
              <div class="content-footer">
                  <div class="page-nav">
                    <div @click="prevPagging" class="page-left">
                        <font-awesome-icon icon="caret-square-left"/>
                    </div>
                    <ul class="page-numbers">
                        <li :class="getPage == item ?'selected-item':''" @click="setPage(item)" v-for="item in getPagging" :key="item" class="page-number">{{item}}</li>
                    </ul>
                    <div @click="nextPagging" class="page-right">
                        <font-awesome-icon icon="caret-square-right"/>
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
    computed: {
        ...mapGetters([
            'getMarkContent',
            'getAllPage',
            'getPagging',
            'getContentDetail',
            'getPage'
        ])
    },
    methods: {
        ...mapMutations([
            'changeContentVisible',
            'prevPagging',
            'nextPagging',
            'setPage'
        ]),
        closeModal() {
            this.changeContentVisible();
        },
        goToon(url) {
            window.open(url);
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

    .detail-modal {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(71, 71, 71, 0.548);
        overflow: hidden;
    }

    .detail-modal-inner {
        position: fixed;
        top: 80px;
        left: 15%;
        width: 70%;
        height: 800px;
        overflow: auto;
        background: white;
        display: flex;
        justify-content: center;
    }

    .content {
        width: 90%;
        height: 1300px;
    }

    .content-header {
        position:relative;
        height: 250px;
        display: flex;
    }

    .content-header > .content-img {
        width: 250px;
        height: 200px;
        padding: 20px;
    }
    .content-header > .content-text-box {
        height: 200px;
        padding: 20px;
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .content-text-box > .title-box {
        display: flex;
        align-items: flex-end;
    }
    .content-text-box > .title-box > .title {
        font-size: 20px;
        margin-right: 10px;
        font-weight: bold;
    }
    .content-text-box > .title-box > .writer {
        font-size: 14px;
    }

    .content-text-box > .description {
        font-size: 18px;
    }

    .content-name > .name-box{
        width: 100%;
        display: inline-block;
    }

    .content-name > .name-box > li {
        display: inline-block;
        padding: 10px 5px;
        box-sizing: border-box;
        border-bottom: 1px solid;
    }

    .name-box > .image-name {
        width: 18%;
    }

    .name-box > .name-name {
        width: 62%;
    }

    .name-box > .date-name {
        width: 20%;
    }

    .content-box {
        height: 710px;
    }

    .content-box > .content-items {
        display: flex;
        flex-direction: column;   
    }

    .content-items > .content-item {
        height: 70px;
        display: flex;
        align-items: center;
    }

    .content-item > .img-box {
        width: 18%;
        height: 60px;
        border-bottom: 1px solid rgb(187, 187, 187);
    }
    .content-item > .img-box > .img {
        width: 100px;
        height: 60px;
    }
    .content-item > .title {
        width: 62%;
        border-bottom: 1px solid rgb(187, 187, 187);
        height: 60px;
    }
    .content-item > .date {
        width: 20%;
        border-bottom: 1px solid rgb(187, 187, 187);
        height: 60px;
    }

    .content-item p {
        display: flex;
        align-items: center;
    }

    .content-footer {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }


    .page-nav {
        display: flex;
        width: 400px;
        justify-content: space-between;
        align-items: center;
    }
    .page-nav > .page-left,
    .page-nav > .page-right {
        width: 30px;
        height: 30px;
        border: 1px solid;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(82, 186, 255);
    }
    .page-numbers {
        display: flex;
    }
    .page-number {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .site {
        position: absolute;
        width: 100px;
        height: 40px;
        bottom: 0px;
        right: 0px;
        background: url('../../assets/images/site/naver.png');
        background-size: 100% 100%;
    }

    .close-btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        position: fixed;
        width: 50px;
        height: 50px;
        border: 1px solid;
        border-radius: 50px;
        color: rgb(14, 98, 255);
        top: 10px;
        right: 10px;
    }

    .selected-item {
        background: rgb(0, 110, 255);
        color: white;
        font-weight: bold;
        border-radius: 50px;
    }
</style>