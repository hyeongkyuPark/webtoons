<template>
  <div class="login-form">
      <div class="login-form-wrap">
        <div class="join-box">
            <div class="join-wrap">
                <h2>방문이 처음이신가요?</h2>
                <p>
                    자주보는 웹툰, 밀리는 웹툰 쌓이고 쌓여 어디까지 보았는지, 어떤 웹툰을 봤었는지 잊어버릴 때 많으시죠?
                    그럴때 필요한 사이트가 바로 웹툰 모아보기 입니다. 다양한 사이트의 웹툰을 한번에 관리 할 수 있게 개발중입니다.
                    가입을 원하신다면 아래 회원가입 버튼을 눌러주세요.
                </p>
                <button @click="goJoin">회원가입</button>
            </div>
        </div>
        <div class="login-box">
            <div class="login-wrap">
                <h2>Signin</h2>
                <div class="under-line"></div>
                <form action="">
                    <div class="id-input">
                        <input @focus="setFocusId" @focusout="focusOutId" id="user-id" name="user-id" type="text" v-model="user.userId" >
                        <label :class="checkId || checkFocusId?'move':'none-move'" id="id-label" class="input-inner" for="user-id">User ID</label>
                    </div>
                    <div class="pw-input">
                        <input @focus="setFocusPw" @focusout="focusOutPw" id="user-pw" name="user-pw" type="password" v-model="user.userPw">
                        <label :class="checkPw || checkFocusPw?'move':'none-move'" class="input-inner" for="user-pw">Password</label>
                    </div>
                    <input @click="loginCheck" type="button" value="LOGIN">
                </form>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapMutations} from 'vuex';

export default {
    data() {
        return {
            user: {
                userId: '',
                userPw: ''
            },
            focusId: false,
            focusPw: false
        }
    },
    computed: {
        checkId() {
            return this.user.userId != '';
        },
        checkPw() {
            return this.user.userPw != '';
        },
        checkFocusId() {
            return this.focusId;
        },
        checkFocusPw() {
            return this.focusPw;
        }
    },
    methods: {
        ...mapMutations([
            'setLoginCheck'
        ]),
        goJoin() {
            document.location ='/join';
        },
        setFocusId() {
            this.focusId=true;
        },
        focusOutId() {
            this.focusId=false;

        },
        setFocusPw() {
            this.focusPw=true;
        },
        focusOutPw() {
            this.focusPw=false;

        },
        loginCheck() {
            axios.post('http://localhost:3030/user/login', this.user)
            .then((res) => {
                if (res.data == 'no match pw' || res.data == false) {
                    this.$swal.fire({
                        title: 'Error!',
                        text: '아이디 또는 비밀번호를 확인하세요.',
                        icon: 'error',
                        showCancelButton: true,
                        cancelButtonColor: '#54BD54',
                        confirmButtonText: '뒤로',
                        cancelButtonText: '홈'
                    }).then((result) => {
                        if (!result.value) {
                            document.location = '/';
                        }
                    });
                } else {
                    document.cookie = 'userID' + '=' + res.data + ';path=/';
                    document.location = '/';
                }
            });
        }
    }
}
</script>
<style scoped>

    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    .login-form {
        height: 760px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form-wrap {
        width: 950px;
        height: 500px;
        border: 1px solid rgb(56, 56, 56);
        display: flex;
        border-radius: 30px;
    }
    .join-box,
    .login-box {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .join-box {
        background: url('../../assets/images/login2.png') no-repeat;
        background-position: center;
        background-size: 140%;
        overflow: hidden;
        border-radius: 25px 0 0 25px;
        color: white;
    }
    .join-wrap {
        width: 300px;
    }
    .join-wrap>h2 {
        font-size: 22px;
        font-weight: bold;
    }
    .join-wrap>h2::after {
        display: block;
        margin-top: 10px;
        content: '';
        width: 100px;
        height: 3px;
        background: white;
    }
    .join-wrap>p {
        margin-top: 30px;
        font-size: 14px;
        line-height: 1.3em;
        word-break: keep-all;
    }
    .join-wrap>button {
        width: 120px;
        height: 35px;
        margin-top: 30px;
        background: none;
        color: white;
        border: 2px solid white;
        border-radius: 50px;
        outline: none;
    }
    .login-wrap {
        width: 230px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .login-wrap>h2 {
        font-size: 22px;
        color: rgb(129, 129, 129);
        font-weight: bold;
    }
    .login-wrap .under-line {
        width: 30px;
        height: 3px;
        background: rgb(10, 97, 236);
        margin-top: 10px;
    }

    .login-wrap form {
        width: 100%;
    }

    .login-wrap input:not(:last-child) {
        width: 100%;
        height: 35px;
        padding: 5px 10px;
        border: none;
        border-bottom: 1px solid rgb(156, 156, 156);
        box-sizing: border-box;
    }

    .login-wrap input:last-child {
        width: 100%;
        height: 40px;
        font-weight: 700;
        background: rgb(10, 97, 236);
        color: white;
        border: none;
        border-radius: 50px;
        margin-top: 50px;
        outline: none;
    }

    .id-input,
    .pw-input
     {
        position: relative;
        margin-top: 50px;
    }
    .id-input label,
    .pw-input label
     {
        position: absolute;
        top: 5px;
        left: 10px;
        font-size: 14px;
        color: rgb(156, 156, 156);
        transition: .3s;
        -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select:none;
    }

    label.move {
        transform: translate(-10px, -20px);
        color: black;
    }
    label.none-move {
        transform: translate(0px, 0px);
        color: rgb(156, 156, 156);
    }
</style>