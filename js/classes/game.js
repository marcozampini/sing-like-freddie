export default class Game {
  constructor(songs) {
    this.songs = songs
    this.playerName = ''
    this.freddieStyle = null
    this.currentRound = 0
    this.rounds = []
    this.score = 0
  }
  randomSongsOrder() {
    let songsIndexes = []
    let chosenIndex
    for (let i = 0; i < this.songs.length; i++) {
      chosenIndex = Math.floor(Math.random() * this.songs.length)

      if (songsIndexes.includes(chosenIndex)) i--
      else songsIndexes.push(chosenIndex)
    }
    return songsIndexes
  }
}
