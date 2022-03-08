import Game from './classes/game.js'
import Level from './classes/level.js'
import Song from './classes/song.js'
import Stream from './classes/stream.js'

const songs = [
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
  ),
  new Song(
    'Don’t Stop Me Now',
    'Freddie Mercury',
    'Jazz',
    1979,
    'don-t-stop-me-now.mp3',
    42.1,
    13.8,
    'D',
    4
  ),
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
  ),
]
let chosenSongIndex = Math.floor(Math.random() * songs.length)
const song = songs[chosenSongIndex]
const capturedStream = new Stream(song.targetNote)
console.log(capturedStream)
song.loadSong()
song.playSample()

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
