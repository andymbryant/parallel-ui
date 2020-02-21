class Runner {
  constructor(
      actions=[],
      data={
        "paths": {},
        "semaphores": {},
        "agents": {},
        "links": {}
      }
    ) {
    this._actions = actions
    this._data = data
  }

  get actions() {
    return this._actions
  }

  get data() {
    for (i = 0; i < 10; i++) {

    }
    return this._data
  }

  addAction(action) {
    this._actions.push(action)
  }

  addActions(actions) {
    this._actions.concat(actions)
  }

  // fetchActions() {
    // this._actions =
  // }

  run() {
    return 1
  }

  isActionsEmpty() {
    return this._actions.length === 0
  }

}

export default Runner