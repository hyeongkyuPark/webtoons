<template>
    <div class="sub-nav" v-if="this.getMain != 'home'">
        <div class="sub-nav-wrap">
            <ul class="nav-items" v-if="this.getMain == 'my-toon'">
                <li @click="setMySub('create')" :class="isSelected('create')" class="nav-item">등록</li>
                <li @click="setMySub('collecter')" :class="isSelected('collecter')" class="nav-item">몰아보기</li>
                <li @click="setMySub('all')" :class="isSelected('all')" class="nav-item">전체보기</li>
            </ul>
            <ul class="nav-items" v-if="this.getMain == 'all-toon'">
                <li @click="setAllSub('naver')" :class="isSelected('naver')" class="nav-item">네이버</li>
                <li class="nav-item">준비중..</li>
            </ul>
            <ul class="nav-items" v-if="this.getMain == 'notice'">
                <li class="nav-item link-tab"><a href="https://github.com/hyeongkyuPark" target="_blank">제작자 GitHub</a>
                </li>
                <li class="nav-item link-tab"><a href="https://blog.naver.com/phg0644" target="_blank">제작자 Blog</a></li>
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
            'getSub'
        ])
    },
    methods: {
        ...mapMutations([
            'setMySub',
            'setAllSub'
        ]),
        isSelected(name) {
            if(name == this.getSub.myToon || name == this.getSub.allToon) {
                return 'selected';
            }
        }
    }
}
</script>

<style scoped>
    .sub-nav {
        border-bottom: 1px solid rgb(211, 211, 211);
        background: rgba(223, 223, 223, 0.411);
        display: flex;
        justify-content: center;
    }
    .sub-nav-wrap {
        width: 950px;
    }
    .nav-items {
        display: flex;
    }
    .nav-item {
        cursor: pointer;
        padding: 12px 20px;
        color: rgb(109, 109, 109);
    }
    .selected {
        font-weight: bold;
        color: #000;
    }
    .link-tab {
        color: black;
    }
    .link-tab:hover {
        font-weight: bold;
    }
</style>