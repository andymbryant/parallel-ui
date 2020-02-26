function getPlayerModel(player) {
  const model = `The model for player ${player} is abcd.`
  return model
}

function updatePlayerModel(player) {
  const newModel = `The model for player ${player} is now abcde`
  return newModel
}

export {getPlayerModel, updatePlayerModel}