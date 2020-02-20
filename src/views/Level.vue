<template>
  <div class="level-ctr">
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString"/>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'Level',
  components: {
    TopBar
  },
  data: function() {
    return {
      levelString: ''
    }
  },
  created() {
    this.levelString = this.$route.params.level
  }
}
</script>

<style>

.level-ctr {
  width: 100%;
  height: 100%;
  background: url('../assets/level-01.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
