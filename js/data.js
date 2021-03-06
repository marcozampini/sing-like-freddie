import Song from './classes/song.js'
import Style from './classes/style.js'

const songs = [
  /*
  new Song(
    'Song to test Round Page',
    'Freddie Mercury',
    'A Day At The Races',
    1976,
    'somebody-to-love.mp3',
    0,
    8,
    'F4',
    349.2
  ) */
  new Song(
    'Somebody to love',
    'Freddie Mercury',
    'A Day At The Races',
    1976,
    'somebody-to-love.mp3',
    0,
    16.2,
    'G#2',
    103.8
  ),
  new Song(
    'Radio Ga Ga',
    'Roger Taylor',
    'The Works',
    1984,
    'radio-ga-ga.mp3',
    211.4,
    9.1,
    'F4',
    349.2
  ),
  new Song(
    'We Are The Champions',
    'Freddie Mercury / Brian May',
    'News Of The World',
    1977,
    'we-are-the-champions.mp3',
    14.4,
    19.9,
    'F4',
    349.2
  ),
  new Song(
    'A Kind Of Magic',
    'Roger Taylor',
    'A Kind Of Magic',
    1986,
    'a-kind-of-magic.mp3',
    0,
    17.7,
    'D#4',
    311.1
  ),
  new Song(
    'Bohemian Rhapsody',
    'Freddie Mercury',
    'A Night At The Opera',
    1975,
    'bohemian-rhapsody.mp3',
    42.1,
    13.8,
    'D4',
    293.7
  ),

  /*
  new Song(
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
  ),*/
]
const styles = [
  new Style('a', 'Magic', 'freddie-1986.png'),
  new Style('b', 'Break free', 'freddie-break-free.png'),
  new Style('c', 'King', 'freddie-king.png'),
]

const data = { songs, styles }
export default data
