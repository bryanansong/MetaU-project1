// HTML Elements

// Pick a random song
const getRandomPlaylist = () =>
  data.playlists[Math.floor(Math.random() * data.playlists.length)];
const playlist = getRandomPlaylist();

// Render the playlist information
const displayPlaylist = () => {
  // use correct image
  document.getElementById("playlist-img").src = playlist.playlist_art;

  // Get playlist object data
  const playlistDataElement = document.getElementById("playlist-data");

  // Get songs list
  const generatedSongs = populateSongs(playlist.songs);

  // Select html elements to input into
  const playlistData = `
          <div class="card-info">
            <div class="playlist-info">
              <h3 class="playlist-name">${playlist.playlist_name}</h3>
              <h4 class="playlist-creator">Created By: ${playlist.playlist_creator}</h4>
            </div>
            <div class="likes">
              <span>No. of Likes: ${playlist.likeCount}</span>
              
            </div>
          </div>
          
        <ul class="songs-list">${generatedSongs}</ul>`;

  // Load element into HTML
  playlistDataElement.innerHTML = playlistData;
};

// Render the songs in the list
const populateSongs = (songs) => {
  // Populate songs
  let element = "";

  for (const song of songs) {
    element += `<li>
				  <div class="song-item">
					<img
					  class="song-img"
					  src="${song.cover_art}"
					  alt="song image"
					/>
					<div class="song-data">
					  <div class="song-name">${song.title}</div>
					  <div class="song-length">${song.artist}</div>
					  <div class="song-album">${song.album}</div>
					  <div class="song-duration">${song.duration}</div>
					</div>
				  </div>
				</li>`;
  }
  return element;
};

displayPlaylist();
