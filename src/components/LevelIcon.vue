<template>
  <div @click="navigate(level)" class="level-icon">
    <div class="icon-label">{{level}}</div>
  </div>
</template>

<script>
export default {
  name: 'LevelIcon',
  props: {
    level: String
  },
  methods: {
    navigate(level) {
      const route = 'Level'
      this.$router.push({name: route, params: {level}})
    }
  }
}
</script>
<style scoped>
  .level-icon {
    width: 30px;
    height: 30px;
    margin: 0 0.6rem 0.6rem 0;
    border: 2px solid #99cfd7;
    padding: .6rem;
    cursor: pointer;
  }
  .icon-label {
    font-weight: 700;
    color: white;
    font-size: 1.5rem;
    text-align: center;
  }
</style>
