import axios from 'axios'
import {getPlayerModel} from '@/player-model/player-model'

class APIService {
  constructor() {
    this._ROOT_URL = process.env.BASE_URL
    this._API_URL = [process.env.BASE_URL, 'api'].join('')
  }

  get ROOT_URL() {
    return this._ROOT_URL
  }

  get API_URL() {
    return this._API_URL
  }

  getLevelData(id) {
    // let url = `${this._API_URL}/get-level-data/`
    // if (id) {
    //   url = url + id
    // }
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`
    return axios.get(url)
  }

  getPlayerModel(player) {
    return new Promise((resolve, reject) => {
      if (player) {
        resolve(getPlayerModel(player))
      } else {
        reject(new Error('Please include a player.'))
      }
    })
  }
}

export default APIService