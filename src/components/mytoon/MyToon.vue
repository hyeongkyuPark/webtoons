<template>
    <div class="my-toon">
        <CreateModal v-if="getSub.myToon == 'create'"/>
        <Collecter v-if="getSub.myToon == 'collecter'" />
        <All v-if="getSub.myToon == 'all'" />
    </div>
</template>

<script>
import Collecter from './Collecter';
import All from './All';
import CreateModal from './CreateModal';


import {mapGetters, mapMutations} from'vuex';

export default {
    created() {
        this.getSearchItemLists();
    },
    components: {
        Collecter,
        All,
        CreateModal
    },
    computed: {
        ...mapGetters([
            'getSub'
        ])
    },
    methods: {
        ...mapMutations([
            'getSearchItemLists'
        ])
    }
}
</script>

<style>
</style>