<template>
  <div class="map-ctr">
    <svg class="map-svg" :height='height' :width='width'>
      <transition-group tag="g" out-in name="semaphore">
        <circle
          v-for="n in semaphores"
          :key="n.id"
          :r="n.r"
          :cx="n.x"
          :cy="n.y"
          :fill="n.color"
          class="semaphore"
        >
        </circle>
      </transition-group>
    </svg>
    </div>
</template>

<script>
// import * as d3 from 'd3'

export default {
  name: 'Map',
  props: {
    mapData: Object
  },
  data: function() {
    return {
      height: 700,
      width: 700
    }
  },
  computed: {
    paths: function() {
      return {}
    },
    semaphores: {
      cache: false,
      get: function() {
        console.log(this.mapData.semaphores)
        return this.mapData.semaphores
      }
    }
  },
  created() {
    this.levelString = this.$route.params.level
  }
}
</script>

<style>

.map-ctr {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.map-svg {
  border: 1px solid black;
}

.semaphore {
  transition: all 0.5s;
  /* transform: all 1s; */
  stroke: red;
  stroke-width: 3
}

.semaphore:hover {
  stroke-width: 6
}

/* .semaphore-enter-active, .semaphore-leave-active {

  stroke-width: 20;
  stroke: green
} */
/* .semaphore-enter, .semaphore-leave-to {
  stroke-width: 10;
  stroke: purple
} */

</style>
