import pitchdetect from '../pitchdetect2.js'

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
    //clone.querySelector('section').setAttribute('id', `round-${this.id}`)
    clone.querySelector('section').setAttribute('id', `round`)
    document.body.insertBefore(clone, this.scoresSection)
    this.song.loadSong()
  }
  playRound() {
    this.song.playSample()

    setTimeout(() => {
      this.score = pitchdetect(this.song.targetFrequency)
    }, this.song.sampleDuration * 1000)
  }
}
