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
  calculateAndLoadScores(scoresTable, gameScoreElement) {
    for (let i = 0; i < this.rounds.length; i++) {
      this.score += this.rounds[i].score
      let tr = document.createElement('tr')
      let tdRound = document.createElement('td')
      tdRound.classList.add('round')
      tdRound.textContent = `Round ${i + 1}`
      let tdSong = document.createElement('td')
      tdSong.classList.add('song')
      tdSong.textContent = this.rounds[i].song.title
      let tdScore = document.createElement('td')
      tdScore.classList.add('score')
      tdScore.textContent = this.rounds[i].score
      tr.appendChild(tdRound)
      tr.appendChild(tdSong)
      tr.appendChild(tdScore)
      scoresTable.appendChild(tr)
    }
    this.score = this.score / this.rounds.length
    gameScoreElement.textContent = Math.round(this.score)
  }
}
