export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
  SET_CURRENT_SONG: "SET_CURRENT_SONG",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };
    case actionType.SET_IS_SONG_PLAYING:
      return { ...state, isSongPlaying: action.isSongPlaying };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };
    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };
    case actionType.SET_CURRENT_SONG:
      return { ...state, currentSong: action.currentSong };
    default:
      return state;
  }
};

export default reducer;
