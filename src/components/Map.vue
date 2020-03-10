<template>
  <div class="map-ctr">
    <svg class="map-svg" :height='height' :width='width'>
      <transition-group tag="g" out-in name="semaphore">
        <circle
          v-for="s in semaphores"
          :key="s.id"
          :r="s.r"
          :cx="s.x"
          :cy="s.y"
          :fill="s.color"
          class="semaphore"
        >
        </circle>
      </transition-group>
      <g>
        <g v-for="row in map" :key="row">
          <!-- <rect
            v-for="col of map[row]"
            :key="col.layout"
            :x="xScale(col.cell['x'])"
            :y="yScale(col.cell['y'])"
            width="100"
            height="100"
            fill="black"
          ></rect> -->
          <rect
            v-for="col of map[row]"
            :key="col.layout"
            x="200"
            y="200"
            width="100"
            height="100"
            fill="black"
          ></rect>
        </g>
      </g>
      <g>
        <line
          v-for="p in paths"
          :key="p.id"
          :stroke="p.stroke"
          :stroke-width="p.strokeWidth"
          stroke-linecap="butt"
          :x1="p.x1"
          :x2="p.x2"
          :y1="p.y1"
          :y2="p.y2"
          class="line"
        ></line>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import Board from "@/classes/Board.js"
export default {
  name: 'Map',
  props: {
    mapData: Object,
    board: Board
  },
  data: function() {
    return {
      selections: {},
      height: 700,
      width: 700,
    }
  },
  methods: {
    zoomed() {
      const transform = d3.event.transform
      d3.selectAll('.line').attr("transform", transform)
      // d3.selectAll('.semaphore').attr("transform", transform)
      this.selections.circleGroup.attr("transform", transform);
    },
    dragStart() {
      // this.start_x =+ d3.event.x
      // this.start_y =+ d3.event.y
    },
    dragged(d, i, a) {
      d3.select(a[i])
        .attr('cx', d3.event.x)
        .attr('cy', d3.event.y)
    },
    dragEnd(d, i, a) {
      const sem = d3.select(a[i])
      const xVal = sem.attr('cx')
      if ((Math.abs(xVal) - 50) < 50) {
        sem.attr('cx', 50)
      }
      console.log('board mutated')
      console.log('action created based on board mutation')
    }

  },
  computed: {
    paths: function() {
      return this.mapData.paths
    },
    semaphores: function() {
      return this.mapData.semaphores
    },
    metadata: function() {
      return this.board.metadata
    },
    map: function() {
      const map = JSON.parse(JSON.stringify(this.board.map))
      for (const row in map) {
        for (const col of map[row]) {
          console.log(col)
        }
      }
      return map
    },
    components: function() {
      return this.board.components
    },
    xScale: function() {
      return d3.scaleLinear()
        .domain([0, this.metadata.board_wiedth])
        .range([0, this.width])
    },
    yScale: function() {
      return d3.scaleLinear()
        .domain([0, this.metadata.board_height])
        .range([this.height, 0])
    },
    zoom: function() {
      return d3.zoom()
        .scaleExtent([1 / 4, 4])
        .on('zoom', this.zoomed)
    },
    drag: function() {
      return d3.drag()
        .on('start', this.dragStart)
        .on('drag', (d, i, a) => this.dragged(d, i, a))
        .on('end', (d, i, a) => this.dragEnd(d,i,a))
    }
  },
  created() {
    this.levelString = this.$route.params.level
  },
  mounted: function() {
    this.selections.svg = d3.select(this.$el.querySelector("svg"))
    this.selections.circleGroup = d3.select(this.$el.querySelector("g"))
    this.selections.svg.call(this.zoom)
    const circles = this.selections.circleGroup.selectAll('circle')
    this.drag(circles)
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
  /* transition: all 1s; */
  /* transform: all 1s; */
  stroke: black;
  stroke-width: 2
}

.semaphore:hover {
  stroke-width: 4
}

</style>
