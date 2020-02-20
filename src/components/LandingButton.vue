<template>
  <div class="button-ctr">
    <div @click="navigate(buttonData.route)" class="button">
      <i :class='buttonData.icon'></i>
    </div>
    <div class="button-label">{{buttonData.label}}</div>
  </div>
</template>

<script>
export default {
  name: 'LandingButton',
  props: {
    buttonData: Object
  },
  methods: {
    navigate(route) {
      if (!route) {
        alert("Oh come on, you don't want to do that!")
      } else {
        this.$router.push({ name: route })
      }
    }
  }
}
</script>
<style scoped>

.button-ctr {
  display: flex;
  height: 100%;
  margin: 1rem 0;
  cursor: pointer;
}
.button, .button-label {
  width: 50%;
  height: 50%;
  text-align: center;
  padding: 1rem;
}
.button {
  background-color: rgba(0,0,0,0.6);
  color: #be5e35;
}
</style>
