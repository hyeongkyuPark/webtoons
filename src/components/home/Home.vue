<template>
  <div>
    <TodayToon />
    <BestToonDaum  />
    <BestToonNaver  />
  </div>
</template>

<script>
import TodayToon from './TodayToon'
import BestToonDaum from './BestToonDaum'
import BestToonNaver from './BestToonNaver'

export default {
    components: {
        TodayToon,
        BestToonDaum,
        BestToonNaver
    }
}
</script>

<style>

</style>