export default class Song {
  constructor(
    title,
    author = 'Queen',
    sampleUrl,
    sampleStartsAt,
    sampleEndsAfter,
    targetNote,
    targetOctave
  ) {
    this.title = title
    this.author = author
    this.sampleUrl = sampleUrl
    this.sampleStartsAt = sampleStartsAt
    this.sampleEndsAfter = sampleEndsAfter
    this.targetNote = targetNote
    this.targetOctave = targetOctave
  }
}
