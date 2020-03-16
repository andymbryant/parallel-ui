<template>
  <div class="bot-bar-ctr">
    <div class="bot-bar">
      <div class="goal-btn-ctr">
        <button class="bot-btn goal-btn">LEVEL GOAL</button>
      </div>
      <div class="test-submit-ctr">
        <button @click="run('test')" class="bot-btn test-btn">TEST</button>
        <button @click="run('submit')" class="bot-btn submit-btn">SUBMIT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BotBar',
  props: {
    isLevel: Boolean,
    levelString: String,
    run: Function
  },
  methods: {
  }
}
</script>

<style scoped>

.bot-bar-ctr {
  position: absolute;
  bottom: 0;
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

.bot-bar {
  height: 100%;
  width: 100%;
  background-color: #343b40;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.test-submit-ctr {
  width: 320px;
  display: flex;
  justify-content: space-between;
}

.bot-btn {
  width: 150px;
  border: 2px solid #CC5827;
  background-color: rgba(0,0,0,0);
  font-size: 1rem;
  padding: 5px;
  color: white;
  cursor: pointer;
}


</style>
