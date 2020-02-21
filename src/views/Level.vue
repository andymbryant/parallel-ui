<template>
  <div class="level-ctr">
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString" />
    <div class="btn add-element" @click="run()">Run</div>
    <Map :mapData="mapData" />
  </div>
</template>

<script>
// import * as d3 from "d3"
import TopBar from "@/components/TopBar.vue"
import Map from "@/components/Map.vue"
// import Runner from "@/Runner.js"
import Action from "@/Action.js"
import Vue from 'vue'

export default {
  name: "Level",
  components: {
    TopBar,
    Map
  },
  data: function() {
    return {
      levelString: "",
      mapData: {
        paths: {},
        semaphores: {},
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
      for (let i=0; i < 10; i++) {
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
