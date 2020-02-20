<template>
  <div class="top-bar-ctr">
    <div @click="navigate()" class="back-button">
      <i class='fas fa-arrow-left'></i>
    </div>
    <div class="top-bar">
      <div class="title-ctr">{{title}}</div>
    </div>
    <div v-if="isLevel" class="level-counter">{{levelString}}</div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: String,
    isLevel: Boolean,
    levelString: String
  },
  methods: {
    navigate() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

.top-bar-ctr {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
}

.back-button {
  background-color: #be5e35;
  color: white;
  width: 7%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
}

.top-bar {
  height: 100%;
  width: 93%;
  background-color: #343b40;
  display: flex;
  align-items: center;
}

.title-ctr {
  margin: 1rem;
  color: white;
  font-weight: 700;
  font-size: 2rem;
}

.level-counter {
  position: absolute;
  right: 0;
  height: 100%;
  width: 80px;
  background-color: #be5e35;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

</style>
