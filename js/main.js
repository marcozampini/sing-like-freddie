import Game from './classes/game.js'
import Round from './classes/round.js'
import Song from './classes/song.js'
import Stream from './classes/stream.js'

const songs = [
  /*
  new Song(
    'We Are The Champions',
    'Freddie Mercury / Brian May',
    'News Of The World',
    1977,
    'we-are-the-champions.mp3',
    14.4,
    19.9,
    'F',
    4
  ),
  new Song(
    'Somebody to love',
    'Freddie Mercury',
    'A Day At The Races',
    1976,
    'somebody-to-love.mp3',
    42.1,
    13.8,
    'D',
    4
  ),*/
  new Song(
    'Don’t Stop Me Now',
    'Freddie Mercury',
    'Jazz',
    1979,
    'don-t-stop-me-now.mp3',
    78.3,
    7.66,
    'F',
    4
  ) /*
  new Song(
    'Bohemian Rhapsody',
    'Freddie Mercury',
    'A Night At The Opera',
    1975,
    'bohemian-rhapsody.mp3',
    42.1,
    13.8,
    'D',
    4
  ),*/,
]

// Options
const freddieStyles = [
  { name: 'Break free style', imageUrl: 'freddie-break-free' },
  { name: '1986 style', imageUrl: 'freddie-1986' },
]
/*let songsToSing
let freddieStyle
let playerName*/

// Keys
document.addEventListener('keydown', (event) => {
  switch (window.location.hash) {
    case '':
    case '#':
    case 'landing':
      if (event.key === 'Enter') {
        window.location.hash = '#options'
      }
      break
    case '#options':
      if (event.key === 'Enter') {
        window.location.hash = '#game'
        let playerName = document.querySelector('#options #player-name').value
        let numberOfRounds = document.querySelector(
          '#options #number-rounds'
        ).value
        let freddieStyle = document.querySelector(
          '#options input[name="freddie-style"]:checked'
        ).value
        console.log(playerName)
        console.log(numberOfRounds)
        console.log(freddieStyle)
        let chosenSongIndex = Math.floor(Math.random() * songs.length)
        const song = songs[chosenSongIndex]
        const capturedStream = new Stream(song.targetNote)
        console.log(capturedStream)
        const round = new Round(1, song)
        round.playTheRound()
      }
      if (event.key === 'l') {
        window.location.hash = ''
      }
      break
    case '#game':
      if (event.key === 'Enter') {
        window.location.hash = '#game'
      }
      if (event.key === 'l') {
        window.location.hash = ''
      }
      if (event.key === 'o') {
        window.location.hash = '#options'
      }
      break
  }
})

window.AudioContext = window.AudioContext || window.webkitAudioContext

var audioContext = null
var isPlaying = false
var sourceNode = null
var analyser = null
var theBuffer = null

var mediaStreamSource = null
var detectorElem, pitchElem, noteElem, detuneElem, detuneAmount

window.onload = function () {
  audioContext = new AudioContext()

  detectorElem = document.getElementById('detector')

  pitchElem = document.getElementById('pitch')
  noteElem = document.getElementById('note')
  detuneElem = document.getElementById('detune')
  detuneAmount = document.getElementById('detune_amt')
}
