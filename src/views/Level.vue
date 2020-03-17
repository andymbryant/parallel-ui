<template>
  <div class="level-ctr">
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString" />
    <Map :board="board" :mapData="mapData"/>
    <BotBar :run="run" :terminate="terminate" />
  </div>
</template>

<script>
import Vue from 'vue'
import TopBar from "@/components/TopBar.vue"
import BotBar from "@/components/BotBar.vue"
import Map from "@/components/Map.vue"
import Board from "@/classes/Board.js"
import Action from "@/classes/Action.js"
import APIService from "@/api.js"

const api = new APIService()

export default {
  name: "Level",
  components: {
    TopBar,
    BotBar,
    Map
  },
  data: function() {
    return {
      levelString: "",
      loading: false,
      parsing: false,
      terminated: false,
      mapData: {
        semaphores: {},
        threads: {
          "1001": {
            id: "1001",
            x: 3,
            y: 3
          },
          "1002": {
            id: "1002",
            x: 1,
            y: 1
          }
        }
      },
      board: {}
    }
  },
  methods: {
    terminate() {
      this.terminated = true
    },
    async run(string) {
      let me = this
      this.parsing = true
      this.board.fetchActionData()
        .then(res => {
          this.parsing = false
          for (let i = 0; i < me.board.numActions; i++) {
            let nextAction = me.board.nextAction
            setTimeout(function timer() {
              if (!this.terminated) {
                me.takeAction(nextAction)
              } else {
                return -1
              }
            }, i * 1000 );
          }
        })
        .catch(err => console.error(err))
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
    this.board.fetchBoardData()
      .then(res => console.log('Successful fetch'))
      .catch(err => console.error(err))
  },
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
