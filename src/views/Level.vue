<template>
  <div class="level-ctr">
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString" />
    <div class="btn add-element" @click="run()">Run</div>
    <Map :board="board"/>
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
      board: {}
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
