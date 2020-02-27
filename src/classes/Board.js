// TODO boyd

class Board {
  constructor(actions=[]) {
    this._actions = actions
  }

  get actions() {
    return this._actions
  }

  getCurrentState() {
    // returns current state without actions
    return 1
  }

  addAction(action) {
    this._actions.push(action)
  }

  addActions(actions) {
    this._actions.concat(actions)
  }

}

export default Board