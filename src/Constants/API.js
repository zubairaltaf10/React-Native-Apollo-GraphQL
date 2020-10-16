import {Platform} from 'react-native';

const mode = {
  developement: 'http://192.168.10.3:5000/',
  QA: 'http://178.62.50.175:5000/',
  production: 'http://myapp.com/',
};

const apiURL = 'revisebeat/api/v1';
// {
//   "docId": "12",
//   "language":"es",
//   "voice": "Kimberly",
//   "userId": "27",
//   "tuning":{
//     "volume":"-12dB",
//     "pitch": "-100%",
//     "rate": "-100%"
//   }
// }
const baseURL = mode.QA; //Change development mode

const API = {
  signup: baseURL + apiURL + '/signup',
  update: baseURL + apiURL + '/user/',
  updatePassword: baseURL + apiURL + '/user/updatePassword',
  login: baseURL + apiURL + '/login',
  getAllSubscriptions: baseURL + apiURL + '/getAllSubscriptions',
  subscribePlan: baseURL + apiURL + '/subscribePlan',
  sendVerificationCode: baseURL + apiURL + '/sendVerificationCode',
  languages: baseURL + apiURL + '/getLanguages',
  createPlaylist: baseURL + apiURL + '/createPlaylist',
  addDocument: baseURL + apiURL + '/addDocument',
  uploadDocument: baseURL + apiURL + '/uploadDocument',
  updateDocument: baseURL + apiURL + '/updateDocument',
  deleteDocument: baseURL + apiURL + '/updateDocument',
  getPollyVoices: baseURL + apiURL + '/getPollyVoices',
  getAllGenres: baseURL + apiURL + '/getAllGenres',
  getAllBgm: baseURL + apiURL + '/getAllBgm',
  translate: baseURL + apiURL + '/translate',
  getUserDocuments: baseURL + apiURL + '/getUserDocuments',
  getUserPlaylist: baseURL + apiURL + '/getUserPlaylist',
};

export default API;

// /createPlaylist
// Post: {body.name}

// /updatePlaylist
// put: {body.name, params.id}

// /deletePlaylist
// delete: {params.id}

// /getUserPlaylist
// get: {params.id}

// /addAudio
// post: {body.playlistId, body.audioId, body.audioPath}

// /deleteAudio
// delete: {body.audioPlaylistId}
