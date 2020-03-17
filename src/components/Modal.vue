<template>
  <div class="modal-ctr">
    <div class="modal-box">
      <h1>{{text}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    text: String
  },
  data: function() {
    return {
      stub: ''
    }
  }
}
</script>

<style>
  .modal-ctr {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-box {
    border: 1px solid black;
    background-color: white;
    width: 300px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>