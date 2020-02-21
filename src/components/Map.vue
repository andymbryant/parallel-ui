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
    semaphores: function() {
      return this.mapData.semaphores
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
  transition: all 1s;
  /* transform: all 1s; */
  stroke: black;
  stroke-width: 2
}

.semaphore:hover {
  stroke-width: 4
}

</style>
