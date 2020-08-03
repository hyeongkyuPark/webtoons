<template>
  <div class="main-header">
      <div class="main-header-wrap">
      <div @click="goHome" class="title-box">
          <div class="main-logo"></div>
          <h2 class="main-title">웹툰 모아보기</h2>
      </div>
      <div class="login-box" v-if="!this.getLoginCheck">
          <a href="/login">로그인</a>
          <a href="/join">회원가입</a>
      </div>
      <div class="login-box" v-else>
          <a href="#">마이페이지</a>
          <a href="#">로그아웃</a>
      </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getLoginCheck'
        ])
    },
    methods: {
        goHome() {
            document.location.href = '/';
        }
    }
}
</script>

<style scoped>
    .main-header {
        display: flex;
        padding-top: 20px;
        justify-content: center;
    }
    .main-header-wrap {
        width: 950px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title-box {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .main-logo {
        width: 50px;
        height: 50px;
        background: url('../assets/images/logo/mainLogo.jpg');
        background-size: 300%;
        margin-right: 10px;
        background-position: center;
    }
    .main-title {
        font-size: 30px;
        font-family: Arial;
        font-weight: bold;
    }
    .login-box {
        display: flex;
        align-items: center;
    }
    .login-box a {
        padding: 0 10px;
    }
</style>