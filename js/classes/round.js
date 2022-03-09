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
    console.log(this.song)
    this.song.loadSong()
    this.song.playSample()

    setTimeout(() => {
      this.score = pitchdetect(this.song.targetFrequency)
    }, this.song.sampleDuration * 1000)
  }
}
