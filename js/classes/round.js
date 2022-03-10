import pitchdetect from '../pitchdetect2.js'

export default class Round {
  constructor(id, song) {
    this.id = id
    this.song = song
    this.score = 0
  }
  loadRound() {
    this.song.loadSong()
  }
  playRound() {
    this.song.playSample()

    setTimeout(() => {
      pitchdetect(this.song.targetFrequency)
    }, this.song.sampleDuration * 1000)
  }
}
