import Game from './classes/game.js'
import Round from './classes/round.js'
import Song from './classes/song.js'

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
    349.2
  ) /*
  new Song(
    'Somebody to love',
    'Freddie Mercury',
    'A Day At The Races',
    1976,
    'somebody-to-love.mp3',
    42.1,
    13.8,
    'D',
    220
  ),*/,
  /*new Song(
    'Don’t Stop Me Now',
    'Freddie Mercury',
    'Jazz',
    1979,
    'don-t-stop-me-now.mp3',
    78.3,
    7.66,
    'F',
    220
  ),
  new Song(
    'Who Wants To Live Forever',
    'Brian May',
    'A Kind Of Magic',
    1986,
    'who-wants-to-live-forever.mp3',
    78.3,
    7.66,
    'F',
    220
  ) 
  new Song(
    'Bohemian Rhapsody',
    'Freddie Mercury',
    'A Night At The Opera',
    1975,
    'bohemian-rhapsody.mp3',
    42.1,
    13.8,
    'D',
    220
  ),*/
  ,
]

// Ask the permission to use the mic to the browser
/*navigator.mediaDevices.getUserMedia({
  audio: {
    mandatory: {
      googEchoCancellation: 'false',
      googAutoGainControl: 'false',
      googNoiseSuppression: 'false',
      googHighpassFilter: 'false',
    },
    optional: [],
  },
})*/

// Options
const freddieStyles = [
  { name: 'Break free style', imageUrl: 'freddie-break-free' },
  { name: '1986 style', imageUrl: 'freddie-1986' },
]

// Sections and templates
const roundTemplate = document.querySelector('#round-template')
const scoresSection = document.querySelector('#scores')

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

    // Set up options, create the game and play the first round
    case '#options':
      if (event.key === 'Enter') {
        let playerName = document.querySelector('#options #player-name').value
        let numberOfRounds = document.querySelector(
          '#options #number-rounds'
        ).value
        let freddieStyle = document.querySelector(
          '#options input[name="freddie-style"]:checked'
        ).value
        const game = new Game(playerName, numberOfRounds, freddieStyle)

        // Only one song for the moment
        let chosenSongIndex = Math.floor(Math.random() * songs.length)
        const song = songs[chosenSongIndex]

        const round = new Round(1, song, roundTemplate, scoresSection)
        round.loadRound()

        window.location.hash = 'round-1'

        round.playRound()
        game.rounds.push()
      }
      if (event.key === 'l') {
        window.location.hash = ''
      }
      break
    case '#round-1':
      if (event.key === 'Enter') {
        window.location.hash = '#round-1'
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
