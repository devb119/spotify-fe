export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_LIKED_SONGS: "SET_LIKED_SONGS",
  SET_PLAYLISTS: "SET_PLAYLISTS",
  SET_IS_SONG_PAUSING: "SET_IS_SONG_PAUSING",
  SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
  SET_CURRENT_SONG: "SET_CURRENT_SONG",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",
  SET_PLAYER: "SET_PLAYER",
  SET_ALL_CATEGORIES: "SET_ALL_CATEGORIES",
  SET_QUERY: "SET_QUERY",
  SET_CURRENT_COLOR: "SET_CURRENT_COLOR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };
    case actionType.SET_IS_SONG_PLAYING:
      return { ...state, isSongPlaying: action.isSongPlaying };
    case actionType.SET_IS_SONG_PAUSING:
      return { ...state, isSongPausing: action.isSongPausing };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };
    case actionType.SET_LIKED_SONGS:
      return {
        ...state,
        likedSongs: action.likedSongs,
      };
    case actionType.SET_ALL_CATEGORIES:
      return { ...state, allCategories: action.allCategories };
    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };
    case actionType.SET_PLAYER:
      return {
        ...state,
        player: action.player,
      };
    case actionType.SET_CURRENT_SONG:
      return { ...state, currentSong: action.currentSong };
    case actionType.SET_QUERY:
      return { ...state, query: action.query };
    case actionType.SET_PLAYLISTS:
      return { ...state, playlists: action.playlists };
    case actionType.SET_CURRENT_COLOR:
      return { ...state, currentColor: action.currentColor };
    default:
      return state;
  }
};

export default reducer;
