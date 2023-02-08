export const initialState = {
  user: null,
  isSongPlaying: false,
  isSongPausing: true,
  allSongs: null,
  currentSong: null,
  currentPlaylist: null,
  player: null,
  miniPlayer: false,
  query: "",
  searchType: "song",
  playlists: null,
  currentColor: {
    hex: "#afcec9",
    hexa: "#afcec9ff",
    isDark: false,
    isLight: true,
    rgb: "rgb(175,206,201)",
    rgba: "rgba(175,206,201,1)",
    value: [175, 206, 201, 255],
  },
};
