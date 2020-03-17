<template>
  <div class="level-ctr">
    <Modal v-if="parsing" :text="'Parsing...'"/>
    <TopBar title="Intro to Parallel" :isLevel="true" :levelString="levelString" />
    <Map v-if="!loading" :board="board" :mapData="mapData"/>
    <BotBar :run="run"/>
  </div>
</template>

<script>
import Vue from 'vue'
import TopBar from "@/components/TopBar.vue"
import BotBar from "@/components/BotBar.vue"
import Map from "@/components/Map.vue"
import Modal from "@/components/Modal.vue"
import Board from "@/classes/Board.js"
import Action from "@/classes/Action.js"
import APIService from "@/api.js"

const api = new APIService()

export default {
  name: "Level",
  components: {
    TopBar,
    BotBar,
    Map,
    Modal
  },
  data: function() {
    return {
      levelString: "",
      loading: false,
      parsing: false,
      mapData: {
        semaphores: {},
        pickups: {},
        threads: {},
        deliveries: {}
      },
      board: {}
    }
  },
  methods: {
    async run(string) {
      let me = this
      this.parsing = true
      await this.sleep(1500)
      this.board.fetchActionData()
        .then(res => {
          this.parsing = false
          for (let i = 0; i < me.board.numActions; i++) {
            let nextAction = me.board.nextAction
            setTimeout(function timer() {
              me.takeAction(nextAction)
            }, i * 100 );
          }
        })
        .catch(err => console.error(err))
    },
    takeAction(action) {
      const {category, id} = action.target
      action.mutations.forEach(mutation => {
        const {key, value} = mutation
        // console.log(this.mapData[cat])
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
    this.loading = true
    this.levelString = this.$route.params.level
    this.board = new Board()
    this.board.fetchBoardData()
      .then(() => {
        const componentKeys = Object.keys(this.board.components)
        for (let i = 0; i < componentKeys.length; i++) {
          const id = componentKeys[i]
          const component = this.board.components[id]
          const cat = component.category
          this.mapData[cat][id] = component
        }
      })
      .catch(err => console.error(err))
      .finally(()=> this.loading = false)
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
