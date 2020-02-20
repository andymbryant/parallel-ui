<template>
  <div class="landing">
    <div class="landing-buttons">
      <LandingButton v-for="button in buttons" :buttonData="button" :key="button.label"/>
    </div>
  </div>
</template>

<script>
import LandingButton from '@/components/LandingButton.vue'

export default {
  name: 'Landing',
  components: {
    LandingButton
  },
  data: function() {
    return {
      buttons: [
        {
          label: 'Play',
          icon: 'fas fa-play',
          route: 'LevelSelect'
        },
        {
          label: 'Exit',
          icon: 'fas fa-times',
          route: ''
        }
      ]
    }
  }
}
</script>

<style scoped>

.landing {
  width: 100%;
  height: 100%;
  background: url('../assets/landing.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.landing-buttons {
  position: absolute;
  bottom: 20%;
  right: 35%;
}
</style>
