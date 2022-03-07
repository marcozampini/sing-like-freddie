import Game from './classes/game.js'
import Level from './classes/levels.js'
import Song from './classes/songs.js'

const songs = [
  new Song(
    'We Are The Champions',
    'Freddie Mercury / Brian May',
    'we-are-the-champions.mp3',
    14.4,
    19.9,
    'F',
    4
  ),
  new Song(
    'Bohemian Rhapsody',
    'Freddie Mercury',
    'bohemian-rhapsody.mp3',
    14.4,
    14.9,
    'D',
    4
  ),
]

const song = songs[0]
document.querySelector('#game h2').textContent = song.title
const songSample = document.querySelector('audio')
songSample.src = `./songs/${song.sampleUrl}`

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

  /*
  // Play the song
  songSample.currentTime = song.sampleStartsAt

  gameSection = document.querySelector('#game')

  songSample.play()
  setTimeout(() => {
    document.querySelector('.on-air').textContent = '5'
    setTimeout(() => {
      document.querySelector('.on-air').textContent = '4'
    }, 1000)
    setTimeout(() => {
      document.querySelector('.on-air').textContent = '3'
    }, 2000)
    setTimeout(() => {
      document.querySelector('.on-air').textContent = '2'
    }, 3000)
    setTimeout(() => {
      document.querySelector('.on-air').textContent = '1'
    }, 4000)
    setTimeout(() => {
      //Capture the mic
      songSample.pause()
      document.querySelector('.on-air').textContent = 'On air'
      toggleLiveInput()
      setTimeout(() => {
        audioContext.close()
      }, 3000)
    }, 5000)
  }, song.sampleEndsAfter * 1000 - 5000)
  */
}
