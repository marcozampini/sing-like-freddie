export default class SongsSelection {
  constructor(songs) {
    this.songs = songs
  }

  songsOrder() {
    let songsIndexes = []
    let chosenIndex
    for (let i = 0; i < this.songs.length; i++) {
      chosenIndex = Math.floor(Math.random() * this.songs.length)

      if (songsIndexes.includes(chosenIndex)) i--
      else songsIndexes.push(chosenIndex)
    }
    return songsIndexes
  }
}
