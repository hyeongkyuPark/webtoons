<template>
  <div class="main-nav">
      <div class="main-nav-wrap">
        <ul class="nav-items">
            <li @click='setMain("home")' :class="{selected : isSelected('home') }" class="nav-item">홈</li>
            <li @click='goMytoon("my-toon")' :class="{selected : isSelected('my-toon') }" class="nav-item">내 웹툰</li>
            <li @click='setMain("all-toon")' :class="{selected : isSelected('all-toon') }" class="nav-item">웹툰 전체보기</li>
            <li @click='setMain("notice")' :class="{selected : isSelected('notice') }" class="nav-item">공지사항</li>
        </ul>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getMain',
        ])
    },
    methods: {
        ...mapMutations([
            'setMain'
        ]),
        isSelected(name) {
            return name == this.getMain;
        },
        goMytoon(name) {
            let cookie = document.cookie.match(/[userID]=([a-z A-Z 0-9]*)/);

            if(cookie) {
                this.setMain(name);
            } else {
                this.$swal.fire({
                title: 'Error!',
                text: '로그인이 필요한 서비스입니다.',
                icon: 'error',
                showCancelButton: true,
                cancelButtonColor: '#54BD54',
                confirmButtonText: '뒤로',
                cancelButtonText: '로그인'
            }).then((result) => {
                if(!result.value) {
                    document.location = '/login';
                }
            });
            }
        }
    }
}
</script>

<style scoped>
    .main-nav {
        border-top: 1px solid rgb(211, 211, 211);
        border-bottom: 1px solid rgb(211, 211, 211);
        display: flex;
        justify-content: center;
    }
    .main-nav-wrap {
        width: 950px;
    }
    .nav-items {
        display: flex;
    }
    .nav-item {
        cursor: pointer;
        padding: 17px 20px;
        font-weight: bold;
    }
    .selected {
        background: rgb(90, 90, 90);
        color: white;
    }
</style>