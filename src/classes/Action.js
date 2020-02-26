class Action {
  constructor(target, mutations, info) {
    this._target = target
    this._mutations = mutations
    this._info = info
  }

  get target() {
    return this._target
  }

  get mutations() {
    return this._mutations
  }

  get info() {
    return this._info
  }
}

export default Action