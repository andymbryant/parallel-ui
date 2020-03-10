import board1 from "../data/board1.json";

class Board {
  constructor(actions=[], metadata=[], map=[], components=[]) {
    this._actions = actions
    this._metadata = metadata
    this._map = map
    this._components = components
  }

  fetchStateData() {
    return new Promise((resolve, reject) => {
      const {metadata, map, components} = board1
      this._metadata = metadata
      this._map = map
      this._components = components
      if (this._metadata) {
        // if things are successful, put it here
        resolve(this._metadata)
      } else {
        // if things are unsucessful
        reject(new Error('Error fetching data'))
      }
    })
  }

  get actions() {
    return this._actions
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

}

export default Board