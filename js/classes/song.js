export default class Song {
  constructor(
    title,
    author = 'Queen',
    album,
    year,
    sampleUrl,
    sampleStartsAt,
    sampleDuration,
    targetNote,
    targetOctave
  ) {
    this.title = title
    this.album = album
    this.author = author
    this.year = year
    this.sampleUrl = sampleUrl
    this.songSample = new Audio(`./songs/${this.sampleUrl}`)
    this.sampleStartsAt = sampleStartsAt
    this.sampleDuration = sampleDuration
    this.targetNote = targetNote
    this.targetOctave = targetOctave
  }

  loadSong() {
    document.querySelector('#game h2').textContent = this.title
    document.querySelector(
      '#game h3'
    ).textContent = `Taken from ${this.album}, ${this.year}`
  }

  playSample() {
    this.songSample.currentTime = this.sampleStartsAt
    this.songSample.play()
    setTimeout(() => {
      this.songSample.pause()
    }, this.sampleDuration * 1000)
  }
}
