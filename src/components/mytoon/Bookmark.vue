<template>
    <div class="bookmark-modal">
        <div class="bookmark-inner">
            <button @click="bookmarkModalClose" class="close-btn">
                <font-awesome-icon icon="times"/>
            </button>
            <h2>북마크 변경</h2>
            <div class="text-area">
                <p>현재 봐야할 회차는 <span>{{getBookmark}}</span>화 입니다.</p>
                <p>수정을 원하시는 회차를 선택해주세요.</p>
            </div>
            <select v-model="updateBookmarkNum">
                <option v-for="(item, idx) in getAllContent" :key="idx" :value="item.num">{{item.title}}</option>
            </select>
            <button @click="update()">변경</button>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
            updateBookmarkNum: 1
        }
    },
    computed: {
        ...mapGetters([
            'getAllContent',
            'getBookmark',
            'getContentDetail'
        ])
    },
    methods: {
        ...mapMutations([
            'bookmarkModalClose',
            'setAllToon'
        ]),
        ...mapActions([
            'updateBookmark',
            'updateContent'
        ]),
        update() {
            this.updateBookmark({num:parseInt(this.updateBookmarkNum), no:this.getContentDetail.mytoonNo});
            let cookie = document.cookie.match(/[userID]=([a-z A-Z 0-9]*)/)[1];
            this.setAllToon(cookie);
            this.updateContent(this.getContentDetail);
            this.bookmarkModalClose();
        }
    }
}
</script>

<style scoped>
    .bookmark-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(51, 51, 51, 0.548);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bookmark-inner {
        position: relative;
        width: 500px;
        height: 300px;
        background: white;
        border-radius: 30px;
        padding: 40px 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bookmark-inner > h2 {
        text-align: center;
        font-size: 30px;
        color: rgb(0, 98, 255);
        margin-bottom: 30px;
    }

    .bookmark-inner > .text-area {
        width: 100%;
        height: 50px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .bookmark-inner > select {
        width: 90%;
        height: 30px;
        margin-top: 40px;
    }



    .close-btn {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>