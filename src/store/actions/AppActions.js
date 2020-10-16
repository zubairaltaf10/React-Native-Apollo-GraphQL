import * as types from '../types';
import {Alert} from 'react-native';
import {FULFILLED, PENDING, REJECTED} from '../utils/constants';
import Axios from 'axios';
import API from '../../Constants/API';
import NavigationService from '../../../NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import SNACKBAR from '../../Helpers/SNACKBAR';
import {STORE} from '..';

const getLanguages = () => async dispatch => {
  dispatch({type: types.LANGUAGES + PENDING});

  Axios.get(API.languages)
    .then(res => {
      dispatch({
        type: types.LANGUAGES + FULFILLED,
        payload: {languages: res.data.data},
      });
    })
    .catch(err => {
      console.log('err', err);
      Alert.alert('Failed', err.response.data.message);
      dispatch({
        type: types.LANGUAGES + REJECTED,
        error: err.response.data.message,
      });
    });
};

const addDocument = formData => async dispatch => {
  dispatch({type: types.ADD_DOCUMENT + PENDING});
  const store = STORE.getState();
  const {documents} = store.appReducer;
  const userId = store.authReducer.user.user_id;
  return new Promise((resolve, reject) => {
    Axios.post(API.addDocument, {...formData, userId})
      .then(res => {
        SNACKBAR.simple('Document uploaded successfully!');
        const document = res.data.data;
        documents.push(document);
        dispatch({
          type: types.ADD_DOCUMENT + FULFILLED,
          payload: {documents},
        });
        NavigationService.navigate('Documents');
      })

      .catch(err => {
        Alert.alert('Failed addDocument', err.response.data.message);
        dispatch({
          type: types.ADD_DOCUMENT + REJECTED,
          error: err.response.data.message,
        });
      });
  });
};

const createPlaylist = name => async dispatch => {
  dispatch({type: types.CREATE_PLAYLIST + PENDING});
  const store = STORE.getState();
  const {playlists} = store.appReducer;
  const userId = store.authReducer.user.user_id;

  return new Promise((resolve, reject) => {
    Axios.post(API.createPlaylist, {name, userId})
      .then(res => {
        console.log('createPlaylist res::', res.data.data);
        SNACKBAR.simple('Playlist created!');
        const playlist = res.data.data;
        playlist.audios = [];
        playlists.push(playlist);
        dispatch({
          type: types.CREATE_PLAYLIST + FULFILLED,
          payload: {playlists},
        });
        resolve(playlist);
      })
      .catch(err => {
        SNACKBAR.simple(err.response.data.message);
        // Alert.alert('Failed addDocument', err.response.data.message);
        dispatch({
          type: types.CREATE_PLAYLIST + REJECTED,
          error: err.response.data.message,
        });
      });
  });
};

const translateDocument = (selectedDoc, audioName) => async dispatch => {
  dispatch({
    type: types.TRANSLATE_DOCUMENT + PENDING,
  });
  const store = STORE.getState();
  const userId = store.authReducer.user.user_id;
  const {
    translationFormData,
    documents,
    selectedDocumentForPlayer,
  } = store.appReducer;
  const {document_id, document_name} = selectedDoc;
  translationFormData.userId = userId;
  if (typeof selectedDoc === 'object') {
    translationFormData.docText = null;
    translationFormData.docId = document_id;
    translationFormData.fileName = document_name;
  } else {
    translationFormData.docId = null;
    translationFormData.docText = selectedDoc;
    translationFormData.fileName = audioName;
  }
  translationFormData.bgm = translationFormData.bgm.toString();
  translationFormData.audioName = audioName;
  console.log('translationFormData---', translationFormData);
  return new Promise((resolve, reject) => {
    Axios.post(API.translate, translationFormData)
      .then(async res => {
        console.log('TRANSLARE res:--------', res.data.data);
        // documents.map(doc => {
        //   if (doc.document_id === document_id) {
        //     doc.mixed_audio_path = res.data.data.audio_path;
        //   }
        // });

        // Reload playlists and user docs
        const playlists = await dispatch(await getUserPlaylists());
        await dispatch(await getUserDocuments());

        setTimeout(() => {
          dispatch({
            type: types.TRANSLATE_DOCUMENT + FULFILLED,
            payload: {playlists},
          });
          SNACKBAR.simple('Audio added to playlist!');
          resolve(res.data.data);
          dispatch(selectDocForPlayer(0, playlists[0].audios.length - 1));
          const {playlistIndex, audioIndex} = selectedDocumentForPlayer;
          NavigationService.navigate('Player');

          return res.data.data;
        }, 4000);
      })
      .catch(err => {
        SNACKBAR.simple(err.response.data.message);
        // console.log('err--', err.response);
        reject(err);
        dispatch({
          type: types.TRANSLATE_DOCUMENT + REJECTED,
          error: err.response.data.message,
        });
      });
  });
};

const getUserDocuments = formData => async dispatch => {
  dispatch({type: types.GET_USER_DOCUMENT + PENDING});
  const store = STORE.getState();
  const userId = store.authReducer.user.user_id;
  Axios.post(API.getUserDocuments, {userId})
    .then(res => {
      dispatch({
        type: types.GET_USER_DOCUMENT + FULFILLED,
        payload: {
          documents: res.data.data,
        },
      });
    })
    .catch(err => {
      Alert.alert('Failed getUserDocuments', err.response.data.message);
      dispatch({
        type: types.GET_USER_DOCUMENT + REJECTED,
        error: err.response.data.message,
      });
    });
};

const uploadDocument = (formData, queryParams) => async dispatch => {
  dispatch({type: types.UPLOAD_DOCUMENT + PENDING});
  const config = {headers: {'Content-Type': 'multipart/form-data'}};
  const store = STORE.getState();
  const {documents} = store.appReducer;
  const userId = store.authReducer.user.user_id;

  Axios.post(API.uploadDocument + queryParams, formData, config)
    .then(res => {
      console.log('res from uploadDocument: ', res);
      dispatch({
        type: types.UPLOAD_DOCUMENT + FULFILLED,
        payload: {uploadedDocument: res.data.data},
      });
      return res.data.data;
    })
    .then(async document => {
      console.log('SENDING FOR TRNSLTN---------', document);
      const res = await translateDocument(document);
      if (res) {
        document.speech_path = res.text_to_speech_audio_path;
      }
      documents.push(document);
      dispatch({
        type: types.ADD_DOCUMENT + FULFILLED,
        payload: {documents},
      });

      NavigationService.navigate('DocumentUploaded');
    })
    .catch(err => {
      console.log('upload doc err---', err);
      SNACKBAR.simple(err.response.data.message);
      // Alert.alert('Failed uploadDocument', err.response.data.message);
      dispatch({
        type: types.UPLOAD_DOCUMENT + REJECTED,
        error: err.response.data.message,
      });
    });
};

const deleteDocument = doc => async dispatch => {
  dispatch({type: types.DEL_DOCUMENT + PENDING});
  const {document_id, index} = doc;
  console.log('index', index);
  Axios.delete(API.deleteDocument + '/' + document_id)
    .then(async () => {
      // UPDATE documents array in store to update list
      const {
        documents,
        selectedDocumentForPlayer,
      } = STORE.getState().appReducer;

      // TODO handle case if user deletes currently playing audio
      // if (index === selectedDocumentForPlayer) {
      //   dispatch({
      //     type: types.SET_DOC_FOR_PLAYER,
      //     payload: {selectedDocumentForPlayer: -1},
      //   });
      // }
      return documents.filter(document => {
        return document.document_id !== document_id;
      });
    })
    .then(documents => {
      dispatch({type: types.DEL_DOCUMENT + FULFILLED, payload: {documents}});
    })
    .catch(err => {
      SNACKBAR.simple('Unable to delete document!');
      console.log('deleteDocument err--', err);
      dispatch({
        type: types.DEL_DOCUMENT + REJECTED,
        error: err.response.data.message,
      });
    });
};

const updateDocument = selectedDoc => async dispatch => {
  dispatch({type: types.EDIT_DOCUMENT + PENDING});
  let updatedOldDoc = false;
  return Axios.put(API.updateDocument + '/' + selectedDoc.document_id, {
    name: selectedDoc.document_name,
  })
    .then(data => {
      // UPDATE documents array in store to update list
      const {documents} = STORE.getState().appReducer;
      SNACKBAR.simple('Document title updated!');
      return documents.map(doc => {
        if (doc.document_id === selectedDoc.document_id) {
          updatedOldDoc = true;
          return {
            ...doc,
            document_name: selectedDoc.document_name,
            updated_at: data.data.data.updated_at,
          };
        }
        return doc;
      });
    })
    .then(documents => {
      if (!updatedOldDoc) {
        // NEW DOC UPLOADED, PUSH IN DOCS ARRAY
        documents.push(selectedDoc);
      }
      dispatch({
        type: types.EDIT_DOCUMENT + FULFILLED,
        payload: {
          documents,
        },
      });
    })
    .catch(err => {
      console.log('err.response', err.response);
      Alert.alert('Failed updateDocument', err.response.data.message);
      dispatch({
        type: types.EDIT_DOCUMENT + REJECTED,
        error: err.response.data.message,
      });
    });
};

const getAllVoices = () => async dispatch => {
  dispatch({type: types.GET_ALL_VOICES + PENDING});
  Axios.get(API.getPollyVoices)
    .then(res => {
      console.log('getAllVoices data----', res.data.data);
      dispatch({
        type: types.GET_ALL_VOICES + FULFILLED,
        payload: {voices: res.data.data},
      });
    })
    .catch(err => {
      Alert.alert('Failed getAllVoices', err.response.data.message);
      dispatch({
        type: types.GET_ALL_VOICES + REJECTED,
        error: err.response.data.message,
      });
    });
};

const getUserPlaylists = () => async dispatch => {
  dispatch({type: types.GET_USER_PLAYLISTS + PENDING});
  const store = STORE.getState();
  const userId = store.authReducer.user.user_id;
  return new Promise((resolve, rej) => {
    Axios.get(API.getUserPlaylist + '/' + userId)
      .then(res => {
        // console.log('getUserPlaylists data----', res.data.data);
        dispatch({
          type: types.GET_USER_PLAYLISTS + FULFILLED,
          payload: {playlists: res.data.data},
        });
        resolve(res.data.data);
        return res.data.data;
      })
      .catch(err => {
        Alert.alert('Failed getAllVoices', err.response.data.message);
        rej(err.response.data.message);
        dispatch({
          type: types.GET_USER_PLAYLISTS + REJECTED,
          error: err.response.data.message,
        });
      });
  });
};

const getAllBackgroundMusic = () => async dispatch => {
  dispatch({type: types.GET_ALL_GENRES + PENDING});
  Axios.get(API.getAllBgm)
    .then(res => {
      const bgm = [...res.data.data];
      let categories = [];
      bgm.map(cat => {
        categories.push(cat.bgm_category);
      });
      categories = Array.from(new Set(categories));
      let categorizeData = categories.map(cat => {
        const obj = {type: cat};
        const sounds = [];
        bgm.map(bgm => {
          if (bgm.bgm_category === cat) {
            sounds.push(bgm);
          }
        });
        return {...obj, sounds};
      });
      dispatch({
        type: types.GET_ALL_GENRES + FULFILLED,
        payload: {genres: categorizeData},
      });
    })
    .catch(err => {
      Alert.alert('Failed getAllBgm', err.response.data.message);
      dispatch({
        type: types.GET_ALL_GENRES + REJECTED,
        error: err.response.data.message,
      });
    });
};

const setTranslationFormData = data => async dispatch => {
  dispatch({type: types.TRANSLATION_FORM_DATA, payload: {data}});
};

const setPlayerObject = (type, pausePlayer) => async dispatch => {
  dispatch({
    type: types.SET_PLAYER_OBJECT,
    payload: {
      player: {
        type,
        pausePlayer,
      },
    },
  });
};

const selectDocForPlayer = (playlistIndex, audioIndex) => async dispatch => {
  dispatch({
    type: types.SET_DOC_FOR_PLAYER,
    payload: {
      selectedDocumentForPlayer: {
        playlistIndex,
        audioIndex,
      },
    },
  });
};

export {
  getLanguages,
  addDocument,
  uploadDocument,
  deleteDocument,
  getAllVoices,
  getAllBackgroundMusic,
  setTranslationFormData,
  selectDocForPlayer,
  getUserDocuments,
  updateDocument,
  translateDocument,
  getUserPlaylists,
  createPlaylist,
  setPlayerObject,
};
