// TODO boyd

class Board {
  constructor(actions=[]) {
    this._actions = actions
  }

  get actions() {
    return this._actions
  }

  addAction(action) {
    this._actions.push(action)
  }

  addActions(actions) {
    this._actions.concat(actions)
  }

}

export default Board