<template>
  <div>
      <MainHeader />
      <hr/>
      <LoginForm />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
import LoginForm from '../components/login/LoginForm'

import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getLoginCheck'
        ])
    },
  created() {
    if(this.getLoginCheck) {
      alert('이미 로그인 되어있습니다.');
      history.back();
    }
  },
  components: {
    MainHeader,
    LoginForm
  }
}
</script>

<style>

</style>