export default class Round {
  constructor(id, song, roundTemplate, scoresSection) {
    this.id = id
    this.song = song
    this.score = 0
    this.roundTemplate = roundTemplate
    this.scoresSection = scoresSection
  }
  loadRound() {
    const clone = this.roundTemplate.content.cloneNode(true)
    clone.querySelector('section').setAttribute('id', `round-${this.id}`)
    document.body.insertBefore(clone, this.scoresSection)
  }
  playRound() {
    this.song.loadSong()
    this.song.playSample()
    pitchdetect(this.song.targetFrequency)
  }
}
