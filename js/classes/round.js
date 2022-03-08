export default class Round {
  constructor(id, song) {
    this.id = id
    this.song = song
    this.score = 0
  }
  playTheRound() {
    this.song.loadSong()
    this.song.playSample()
  }
}
