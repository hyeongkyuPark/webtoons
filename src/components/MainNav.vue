<template>
  <div class="main-nav">
      <div class="main-nav-wrap">
        <ul class="nav-items">
            <li @click='setMain("home")' :class="{selected : isSelected('home') }" class="nav-item">홈</li>
            <li @click='setMain("my-toon")' :class="{selected : isSelected('my-toon') }" class="nav-item">내 웹툰</li>
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