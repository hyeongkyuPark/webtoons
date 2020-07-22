<template>
  <div id="app">
    <MainHeader />
    <MainNav />
    <SubNav />
    <Home v-if="getMain == 'home'" />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader';
import MainNav from '../components/MainNav';
import SubNav from '../components/SubNav';
import Home from '../components/home/Home'

import {mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainNav,
    SubNav,
    Home
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