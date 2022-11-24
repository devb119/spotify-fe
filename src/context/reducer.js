export const actionType = {
  SET_USER: "SET_USER",
  SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
  SET_SONG_INDEX: "SET_SONG_INDEX",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };
    case actionType.SET_IS_SONG_PLAYING:
      return { ...state, isSongPlaying: action.isSongPlaying };
    case actionType.SET_SONG_INDEX:
      return { ...state, songIndex: action.songIndex };
    default:
      return state;
  }
};

export default reducer;
