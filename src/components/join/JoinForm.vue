<template>
  <div class="join-form">
      <div class="join-box">
          <h2>회원가입</h2>
          <div class="underline"></div>
          <form id="join-form">
            <div :class="emptyId?'input-box':'warn-input-box'">
              <label for="user.userId">ID *</label>
              <input 
                class="input"
                :class="emptyId?'':'warn-input'"
                @keydown="idCheckOff"
                id="user.userId" name="user.userId" type="text"
                v-model="user.userId"
              >
              <p :class="emptyId?'':'warn'">아이디를 입력해주세요.</p>
            </div>
            <div :class="emptyPw?'input-box':'warn-input-box'">
              <label for="user.userPw">PW *</label>
              <input
                class="input"
                :class="emptyPw?'':'warn-input'"
                @keydown="pwCheckOff"
                id= "user.userPw" name="user.userPw" type="password"
                v-model="user.userPw"
              >
              <p :class="emptyPw?'':'warn'">비밀번호를 입력해주세요.</p>
            </div>
            <div :class="emptyName?'input-box':'warn-input-box'">
              <label for="user.userName">NAME *</label>
              <input 
                class="input"
                :class="emptyName?'':'warn-input'"
                @keydown="nameCheckOff"
                id= "user.userName" name="user.userName" type="text"
                v-model="user.userName"
              >
              <p :class="emptyName?'':'warn'">이름을 입력해주세요.</p>
            </div>
            <div :class="emptyBirth?'input-box':'warn-input-box'">
              <label for="user.userBirth">Birth *</label>
              <input 
              class="input" 
              :class="emptyBirth?'':'warn-input'"
              @keydown="birthCheckOff"
              id= "user.userBirth" name="user.userBirth" type="date"
              v-model="user.userBirth"
            >
            <p :class="emptyBirth?'':'warn'">생년원일을 입력해주세요.</p>
            </div>
            <div :class="emptyMail?'input-box':'warn-input-box'">
              <label for="userEmail">E-MAIL *</label>
              <input 
              class="input" 
              :class="emptyMail?'':'warn-input'"
              @keydown="mailCheckOff"
              id= "userEmail" name="userEmail" type="text"
              v-model="user.userEmail"
            >
            <p :class="emptyMail?'':'warn'">메일주소를 입력해주세요.</p>
              
            </div>
            <input @click="checkAndPost" class="join-btn" type="button" value="회원가입">
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return{
      user: {
        userId: '',
        userPw: '',
        userName: '',
        userBirth: '',
        userEmail: ''
      },
      idEmptyCheck: true,
      pwEmptyCheck: true,
      nameEmptyCheck: true,
      birthEmptyCheck: true,
      mailEmptyCheck: true,
    }
  },
  computed: {
    emptyId() {
      return this.idEmptyCheck || this.user.userId != '';
    },
    emptyPw() {
      return this.pwEmptyCheck || this.user.userPw != '';
    },
    emptyName() {
      return this.nameEmptyCheck || this.user.userName != '';
    },
    emptyBirth() {
      return this.birthEmptyCheck || this.user.userBirth != '';
    },
    emptyMail() {
      return this.mailEmptyCheck || this.user.userEmail != '';
    }
    
  },
  methods: {
    idCheckOff() {
      if(!this.idEmptyCheck) {
        this.idEmptyCheck = true;
      }
    },
    pwCheckOff() {
      if(!this.pwEmptyCheck) {
        this.pwEmptyCheck = true;
      }
    },
    nameCheckOff() {
      if(!this.nameEmptyCheck) {
        this.nameEmptyCheck = true;
      }
    },
    birthCheckOff() {
      if(!this.birthEmptyCheck) {
        this.birthEmptyCheck = true;
      }
    },
    mailCheckOff() {
      if(!this.mailEmptyCheck) {
        this.mailEmptyCheck = true;
      }
    },
    checkAndPost() {
      let action = true;

      if(this.user.userId == '') {
        this.idEmptyCheck = false;
        action = false;
      }
      if(this.user.userPw == '') {
        this.pwEmptyCheck = false;
        action = false;
      }
      if(this.user.userName == '') {
        this.nameEmptyCheck = false;
        action = false;
      }
      if(this.user.userBirth == '') {
        this.birthEmptyCheck = false;
        action = false;
      }
      if(this.user.userEmail == '') {
        this.mailEmptyCheck = false;
        action = false;
      }

      if(!action) {
        return;
      }

      axios.post('http://localhost:3030/user', this.user)
      .then((res) => {
        if(res.data) {
          this.joinSuccess();
        }else {
          this.joinFail();
        }
      });
    },
    joinSuccess() {
            this.$swal.fire({
                title: 'Success!',
                text: '축하합니다. 회원가입이 완료되었습니다.',
                icon: 'success',
                showCancelButton: true,
                cancelButtonColor: '#54BD54',
                confirmButtonText: '로그인',
                cancelButtonText: '홈'
            }).then((result) => {
                if(result.value) {
                  document.location = '/login';
                } else {
                  document.location = '/';
                }
            });
        },
        joinFail() {
            this.$swal.fire({
                title: 'Error!',
                text: '이미 등록된 아이디입니다.',
                icon: 'error',
                showCancelButton: true,
                cancelButtonColor: '#54BD54',
                confirmButtonText: '뒤로',
                cancelButtonText: '홈'
            }).then((result) => {
                if(!result.value) {
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

  .join-form {
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .join-box {
    width: 600px;
    height: 650px;
    border: 1px solid black;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .join-box>h2 {
    font-size: 22px;
    font-weight: bold;
    color: rgb(66, 66, 66);
  }
  .join-box>.underline {
    width: 50px;
    height: 3px;
    margin-top: 10px;
    background: rgb(0, 81, 255);
  }
  .join-box>form {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }

  .join-box>form>.input-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .join-box>form label {
    font-size: 12px;
  }

  .join-box .input {
    height: 30px;
    border: none;
    border-bottom: 1px solid rgb(173, 173, 173);
    text-indent: 10px;
  }
  .join-btn {
    height: 40px;
    border: none;
    outline: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-top: 40px;
    background: rgb(0, 81, 255);
    border-radius: 50px;
  }

  .join-form form>div>p {
    display: none;
  }

  .warn {
    display: block !important;
    font-size: 14px;
    color: red;
  }
  .warn-input-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 13px;
  }
  .warn-input {
    margin-bottom: 3px !important;
    border-bottom: 1px solid red !important;
  }
</style>