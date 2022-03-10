import pitchdetect from '../pitchdetect2.js'

export default class Round {
  constructor(id, song) {
    this.id = id
    this.song = song
    this.score = 0
  }
  loadRound(roundSection, playerName, freddieStyle) {
    roundSection.querySelector('.round-counter').textContent = this.id + 1
    roundSection.querySelector('.song-title').textContent = this.song.title
    roundSection.querySelector('p .song-title').textContent = this.song.title
    roundSection.querySelector('.song-author').textContent = this.song.author
    roundSection.querySelector('.song-album').textContent = this.song.album
    roundSection.querySelector('.song-year').textContent = this.song.year

    roundSection.querySelector('.player-name').textContent = playerName
    roundSection.querySelector('.player-game picture img').src =
      './style/images/freddies/' + freddieStyle.avatarUrl

    roundSection.querySelector('.pitch-note').textContent = '...'
    roundSection.querySelector('.pitch-frequency').textContent = '...'
    roundSection.querySelector('.target-note').textContent =
      this.song.targetNote
    roundSection.querySelector('.target-frequency').textContent =
      this.song.targetFrequency.toFixed(2)
    roundSection.querySelector('.live-score').textContent = 0
    roundSection.querySelector('.comments-on-note').textContent = '...'
  }
  playRound() {
    this.song.playSample()

    setTimeout(() => {
      pitchdetect(this.song.targetFrequency)
    }, this.song.sampleDuration * 1000)
  }
}
