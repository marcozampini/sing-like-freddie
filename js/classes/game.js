export default class Game {
  constructor(playerName, freddieStyle) {
    this.playerName = playerName
    this.freddieStyle = freddieStyle
    this.rounds = []
    this.score = 0
  }
  songsOrder(songs) {
    let songsIndexes = []
    let chosenIndex
    for (let i = 0; i < this.songs.length; i++) {
      chosenIndex = Math.floor(Math.random() * songs.length)

      if (songsIndexes.includes(chosenIndex)) i--
      else songsIndexes.push(chosenIndex)
    }
    return songsIndexes
  }
}
