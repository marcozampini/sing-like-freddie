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
    let partialScore = 0
    for (let i = 0; i < this.rounds.length; i++) {
      partialScore += this.rounds[i].score
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
    console.log('sum of the rounds', partialScore)
    console.log('number of rounds', this.rounds.length)
    partialScore = partialScore / this.rounds.length
    this.score = partialScore
    console.log('average of the rounds', partialScore)
    gameScoreElement.textContent = Math.round(this.score)
    console.log('rounded average of the rounds', partialScore)
  }
}
