import Action from "./Action.js"

import board1 from "../data/board2.json";
import board2 from "../data/board2.json";
import actions1 from "../data/actions1.json"
import actions2 from "../data/actions2.json"

class Board {
  constructor(actions=[], metadata=[], map=[], components=[]) {
    this._actions = actions
    this.actionIndex = -1
    this._metadata = metadata
    this._map = map
    this._components = components
  }

  fetchBoardData() {
    return new Promise((resolve, reject) => {
      const {metadata, map, components} = board2
      this._metadata = metadata
      this._map = map
      this._components = components
      if (this._metadata) {
        // if things are successful, put it here
        resolve(this._metadata)
      } else {
        // if things are unsucessful
        reject(new Error('Error fetching board.'))
      }
    })
  }

  fetchActionData() {
    return new Promise((resolve, reject) => {
      actions2.forEach(a => {
        const target = {
          category: a.category,
          id: a.component
        }
        const mutations = [
          {
            key: "id",
            value: a.component
          },
          {
            key: "cell",
            value: [a.cell[0], a.cell[1]]
          }
        ]
        const newAction = new Action(target, mutations)
        this.addAction(newAction)
      })
      if (this._actions) {
        // if things are successful, put it here
        resolve(this._actions)
      } else {
        // if things are unsucessful
        reject(new Error('Error fetching actions.'))
      }
    })
  }

  get actions() {
    return this._actions
  }

  get numActions() {
    return this._actions.length
  }

  get metadata() {
    return this._metadata
  }

  get map() {
    return this._map
  }

  get components() {
    return this._components
  }

  getCurrentState() {
    // returns current state without actions
    return 1
  }

  addAction(action) {
    console.log('add action')
    this._actions.push(action)
  }

  addActions(actions) {
    this._actions.concat(actions)
  }

  hasAction() {
    const flag = this._actions.length - 1 !== this.actionIndex
    return flag
  }

  get nextAction() {
    if (this.hasAction()) {
      this.actionIndex++
      return this._actions[this.actionIndex]
    } else {
      return new Error('No more actions.')
    }
  }
}

export default Board