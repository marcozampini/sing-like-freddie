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
    targetFrequency
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
    this.targetFrequency = targetFrequency
  }

  playSample() {
    this.songSample.currentTime = this.sampleStartsAt
    this.songSample.play()
    setTimeout(() => {
      this.songSample.pause()
    }, this.sampleDuration * 1000)
  }
}
