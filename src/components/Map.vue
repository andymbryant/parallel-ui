<template>
  <div class="map-ctr">
    <svg v-if="board" class="map-svg" :height='height' :width='width'>
      <transition-group tag="g" out-in name="semaphore">
        <circle
          v-for="s in semaphores"
          :key="s.id"
          :r="s.r"
          :cx="s.x"
          :cy="s.y"
          :fill="s.color"
          class="semaphore"
        ></circle>
      </transition-group>
      <g class="map-group">
        <g v-for="(row, i) in map" :class="'map-row row-' + i" :key="'row_'+ i">
          <rect
            v-for="(col, j) of row"
            :key="col.id"
            :x="xScale(i)"
            :y="yScale(j)"
            :width="tileWidth"
            :height="tileHeight"
            :fill="tileColor(i + j)"
          ></rect>
        </g>
      </g>
      <!-- <transition-group v-for="cat in iconCategories" tag="g" out-in :name="cat" :key="cat"> -->
      <transition-group v-for="cat in iconCategories" tag="g" out-in name="paths" :class="cat" :key="cat">
        <path
          v-for="p in mapData[cat]"
          :key="p.id ? p.id : Math.random()"
          stroke="black"
          stroke-width="1"
          fill="red"
          :class="p.id"
          :transform="`translate(${xScale(p.cell[0])},${yScale(p.cell[1])}), scale(2, 2)`"
          :d="generateIcon(p.type)"
        ></path>
      </transition-group>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import Board from "@/classes/Board.js"
export default {
  name: 'Map',
  props: {
    board: Board,
    mapData: Object
  },
  data: function() {
    return {
      selections: {},
      iconCategories: [],
      height: 800,
      width: 900,
      greyscale: ['#F2F2F2', '#D9D9D9']
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
    },
  },
  computed: {
    tileWidth: function() {
      return this.width / (this.metadata.board_dimensions[0] - 1)
    },
    tileHeight: function() {
      return this.height / (this.metadata.board_dimensions[1] - 1)
    },
    tileColor: function() {
      return d3.scaleOrdinal(this.greyscale);
    },
    paths: function() {
      let allPaths = this.map.flat().filter(p => p.id)
      let paths = Array.from(allPaths, p => {
        return {
          "x": p.coords[0],
          "y": p.coords[1]
        }
      })
      return [paths]
    },
    semaphores: function() {
      // return this.board.components.filter( c => c.type === "semaphore")
      return []
    },
    threads: function() {
      return this.mapData.threads
    },
    pickups: function() {
      return this.mapData.pickups
    },
    deliveries: function() {
      return this.mapData.deliveries
    },
    generateIcon: function() {
      return d3.symbol()
        .type(d => {
          if (d === 'thread') {
            return d3.symbolCircle
          } else if (d === 'pickup') {
            return d3.symbolCross
          } else if (d === 'delivery') {
            return d3.symbolStar
          } else {
            return d3.symbolTriangle
          }
        })
        .size(80);
    },
    star: function() {
      return d3.symbolStar
    },
    metadata: function() {
      return this.board.metadata
    },
    map: function() {
      return this.board.map
    },
    components: function() {
      return this.board.components
    },
    xScale: function() {
      return d3.scaleLinear()
        .domain([0, this.metadata.board_dimensions[0]-1])
        .range([0, this.width])
    },
    yScale: function() {
      return d3.scaleLinear()
        .domain([0, this.metadata.board_dimensions[1]-1])
        .range([0, this.height])
    },
    line: function() {
      return d3.line()
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y))
        // .curve(d3.curveMonotoneX)
        .curve(d3.curveCardinal);

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
    this.iconCategories = Object.keys(this.mapData)
    console.log(this.mapData)
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

.paths {
  transition: all 1s;
  transform: all 1s;
  stroke: black;
  stroke-width: 2;
}

</style>
