class Song {
  constructor(title, author = 'Queen', sampleUrl, targetNote, targetOctave) {
    this.title = title
    this.author = author
    this.sampleUrl = sampleUrl
    this.targetNote = targetNote
    this.targetOctave = targetOctave
  }
}
const songs = [
  new Song(
    'We Are The Champions',
    'Freddie Mercury / Brian May',
    'we-are-the-champions.mp3',
    'F',
    4
  ),
  new Song(
    'Bohemian Rhapsody',
    'Freddie Mercury',
    'bohemian-rhapsody.mp3',
    'F',
    4
  ),
]
