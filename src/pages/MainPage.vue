<template>
  <div id="app">
    <MainHeader />
    <MainNav />
    <SubNav />
    <Home v-if="getMain == 'home'" />
    <MyToon v-if="getMain == 'my-toon'" />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader';
import MainNav from '../components/MainNav';
import SubNav from '../components/SubNav';
import Home from '../components/home/Home'
import MyToon from '../components/mytoon/MyToon'

import {mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainNav,
    SubNav,
    Home,
    MyToon
  },
  computed: {
      ...mapGetters([
          'getMain'
      ])
  }
  
}
</script>
<style>

</style>