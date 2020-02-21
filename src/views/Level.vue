<template>
  <div class="level-ctr">
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString" />
    <div class="buttons">
      <button class="btn add-element" @click="takeAction()">Add Element</button>
      <button class="btn update-element" @click="takeAction()">Update Element</button>
    </div>
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
    generateAction() {
      const target = {
        category: "semaphores",
        id: "s1"
      }
      const xVal = Math.floor(Math.random() * 600) + 100;
      const yVal = Math.floor(Math.random() * 600) + 100;
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
          value: "indianred"
        }
      ]
      return new Action(target, mutations)
    },
    takeAction(action) {
      if (!action) {
        action = this.generateAction()
      }
      const {category, id} = action.target
      action.mutations.forEach(mutation => {
        const {key, value} = mutation
        if (!Object.prototype.hasOwnProperty.call(this.mapData[category], (id))) {
          Vue.set(this.mapData[category], id, {})
        }
        Vue.set(this.mapData[category][id], key, value)
      })
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

.buttons {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: absolute;
  top: 500px;
  left: 100px;
}

.btn {
  margin: .5rem;
}
</style>
