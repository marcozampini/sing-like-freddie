import pitchdetect from '../pitchdetect2.js'

export default class Round {
  constructor(id, song) {
    this.id = id
    this.song = song
    this.score = 0
    this.intervalID = null
  }
  loadRound(roundSection, playerName, freddieStyle) {
    roundSection.querySelector('.queen').classList.add('playing')
    roundSection.querySelector('.queen picture img').src =
      './style/images/queen-singing.gif'
    roundSection.querySelector('.player').classList.remove('playing')
    roundSection.querySelector('.player .on-air').textContent = 'WARM UP'

    roundSection.querySelector('.round-counter').textContent = this.id + 1
    roundSection.querySelector('.song-title').textContent = this.song.title
    roundSection.querySelector('p .song-title').textContent = this.song.title
    roundSection.querySelector('.song-author').textContent = this.song.author
    roundSection.querySelector('.song-album').textContent = this.song.album
    roundSection.querySelector('.song-year').textContent = this.song.year

    roundSection.querySelector('.player-name').textContent = playerName
    roundSection.querySelector('.player-game picture img').src =
      './style/images/freddies/' + freddieStyle.avatarUrl

    roundSection.querySelector('.pitch-note').textContent = ''
    roundSection.querySelector('.pitch-frequency').textContent = ''
    roundSection.querySelector('.target-note').textContent =
      this.song.targetNote
    roundSection.querySelector('.target-frequency').textContent =
      this.song.targetFrequency.toFixed(2)
    roundSection.querySelector('.live-score').textContent = 0
    roundSection.querySelector('.comments-on-note').textContent =
      'Are you ready?'
  }
  playRound(roundSection) {
    roundSection.querySelector('.player .countdown').textContent = ''
    let counterdown = 3

    this.song.playSample()

    setTimeout(() => {
      this.intervalID = setInterval(() => {
        roundSection.querySelector('.player .countdown').textContent =
          counterdown
        counterdown--
      }, 1000)
    }, (this.song.sampleDuration - 4) * 1000)

    setTimeout(() => {
      clearInterval(this.intervalID)
      pitchdetect(this.song.targetFrequency)
      roundSection.querySelector('.queen').classList.remove('playing')
      roundSection.querySelector('.player').classList.add('playing')
      roundSection.querySelector('.queen picture img').src =
        './style/images/queen-listening.gif'
      roundSection.querySelector('.player .on-air').textContent = 'GO!!!'
    }, this.song.sampleDuration * 1000)
  }
}
