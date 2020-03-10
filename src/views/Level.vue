<template>
  <div class="level-ctr">
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString" />
    <div class="btn add-element" @click="run()">Run</div>
    <Map :board="board" :mapData="mapData" />
  </div>
</template>

<script>
import Vue from 'vue'
import TopBar from "@/components/TopBar.vue"
import Map from "@/components/Map.vue"
import Board from "@/classes/Board.js"
import Action from "@/classes/Action.js"
import APIService from "@/api.js"

const api = new APIService()

export default {
  name: "Level",
  components: {
    TopBar,
    Map
  },
  data: function() {
    return {
      levelString: "",
      board: {},
      mapData: {
        paths: {
          "p1": {
            id: "p1",
            fill: "green",
            stroke: "black",
            strokeWidth: "10",
            x1:"50",
            x2:"50",
            y1:"50",
            y2:"600",
          }
        },
        semaphores: {
          "s1": {
            id: "s1",
            x: 445,
            y: 266,
            r: 30,
            color: 'blue'
          },
          "s2": {
            id: "s2",
            x: 224,
            y: 476,
            r: 22,
            color: 'red'
          },
          "s3": {
            id: "s3",
            x: 155,
            y: 154,
            r: 35,
            color: 'purple'
          }
        },
        agents: {},
        links: {}
      }
    }
  },
  methods: {
    async run() {
      let me = this
      console.log('Generating actions')
      let actions = []
      for (let i=0; i < 1; i++) {
        const action = this.generateAction()
        actions.push(action)
      }

      for (let j=0; j<actions.length; j++) {
        setTimeout( function timer() {
        console.log(`running action ${j + 0}`)
          me.takeAction(actions[j])
        }, j*1000 );
      }
    },
    generateAction() {
      const target = {
        category: "semaphores",
        id: "s1"
      }
      const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'pink', 'orange', 'cyan']
      const xVal = Math.floor(Math.random() * 600) + 100;
      const yVal = Math.floor(Math.random() * 600) + 100;
      const index = Math.floor(Math.random() * colors.length) + 0;
      const mutations = [
        {
          key: "id",
          value: target.id
        },
        {
          key: "x",
          value: xVal
        },
        {
          key: "y",
          value: yVal
        },
        {
          key: "r",
          value: 30
        },
        {
          key: "color",
          value: colors[index]
        }
      ]
      return new Action(target, mutations)
    },
    takeAction(action) {
      const {category, id} = action.target
      action.mutations.forEach(mutation => {
        const {key, value} = mutation
        if (!Object.prototype.hasOwnProperty.call(this.mapData[category], (id))) {
          Vue.set(this.mapData[category], id, {})
        }
        Vue.set(this.mapData[category][id], key, value)
      })
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  },
  created() {
    this.levelString = this.$route.params.level
    this.board = new Board()
    this.board.fetchStateData()
      .then(res => console.log('Successful fetch'))
      .catch(err => console.error(err))
  },
  mounted() {

  }
}
</script>

<style>
.level-ctr {
  width: 100%;
  height: 100%;
  background: url("../assets/level-background.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.btn {
  position: absolute;
  top: 80px;
  left: 10px;
  margin: .5rem;
  background-color: white;
  padding: 0.5rem;
  width: 50px;
  text-align: center;
  cursor: pointer;
}

.btn:hover {
  background-color: lightgrey;
}
</style>
