// Modal
// JavaScript for Opening and Closing the Modal
const playlistItem = document.getElementsByClassName("playlist-item");
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];
const shuffleButton = document.getElementById("shuffle-button");
let currentPlaylist;
let deletedPlaylist;
let editing = false;
let sortedPlaylists = data.playlists;

function openModal(playlist) {
  currentPlaylist = playlist;
  document.getElementById("modal-playlist-image").src = playlist.playlist_art;
  document.getElementById("modal-playlist-name").innerText =
    playlist.playlist_name;
  document.getElementById("modal-playlist-creator").innerText =
    playlist.playlist_creator;
  document.getElementById(
    "modal-like-count"
  ).innerText = `Like Count: ${playlist.likeCount}`;
  document.getElementById(
    "modal-songs-count"
  ).innerText = `No. of songs: ${playlist.songs.length}`;

  const songs = playlist.songs;
  populateSongs(songs);
  // Display Modal
  modal.style.display = "block";
}

const populateSongs = (songs) => {
  // Populate songs
  const songsList = document.getElementById("songs-list");

  modal.style.display = "none";
  songsList.innerHTML = "";

  for (const song of songs) {
    songsList.innerHTML += `<li>
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
  modal.style.display = "block";
};

// Shuffle songs
shuffleButton.addEventListener("click", () => {
  populateSongs(shuffleSongs(currentPlaylist.songs));
});

const closeModal = () => {
  modal.style.display = "none";
};

span.onclick = () => {
  modal.style.display = "none";
};

document.getElementById("formCloseButton").onclick = () => {
  formModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === formModal) {
    if (editing === true) {
      updatePlaylistData(deletedPlaylist);
      editing = false;
    }
    closeFormModal();
  }
};

const populatePlaylists = (playlists) => {
  sortedPlaylists = playlists;
  const playlistContainer = document.getElementById("playlist-cards");
  // Remove all the the old playlists
  playlistContainer.innerHTML = "";

  // Add new playlist
  for (const playlist of playlists) {
    const playlistElement = document.createElement("div");
    playlistElement.classList.add("playlist-item");
    playlistElement.innerHTML = `<img
            class="playlist-img"
            src="${playlist.playlist_art}"
            alt="${playlist.playlist_name} cover image"
          />
          <div class="card-info">
            <div class="playlist-info">
              <h3 class="playlist-name">${playlist.playlist_name}</h3>
              <h4 class="playlist-creator">${playlist.playlist_creator}</h4>
            </div>

            
            <div class="buttons">
              <div class="likes">
                <button class="like-button">❤️</button>
                <span>${playlist.likeCount}</span>
              </div>
              <div class="edit">
                <button class="edit-button">✏️</button>
              </div>
              <div class="delete">
                <button class="delete-button">🗑️</button>
              </div>
            </div>
          </div>`;

    playlistElement.addEventListener("click", () => {
      // window.scroll({ top: 0, behavior: "smooth" });
      window.scroll({ top: 0, behavior: "smooth" });
      openModal(playlist);
      window.scroll({ top: 0, behavior: "smooth" });
    });
    // Query Like button
    const likeButton = playlistElement.querySelector(".likes");
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      likeButton.querySelector("span").innerText = likePlaylist(playlist);
    });
    // Query delet button
    const editButton = playlistElement.querySelector(".edit");
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      editPlaylist(playlist);
    });
    // Query delete button
    const deleteButton = playlistElement.querySelector(".delete");
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePlaylist(playlist);
    });
    playlistContainer.appendChild(playlistElement);
  }

  const newPlaylist = document.createElement("div");
  newPlaylist.classList.add("new-playlist-item");
  newPlaylist.innerHTML = `
          <div class="new-playlist-card">
              <h3 class="new-playlist-title">Add a new playlist</h3>
          </div>`;

  newPlaylist.addEventListener("click", () => {
    window.scroll({ top: 0, behavior: "smooth" });
    openFormModal();
    console.log("Modal opened");
  });
  playlistContainer.appendChild(newPlaylist);
};

const playlistClick = (playlist) => {
  openModal(playlist);
};

const likePlaylist = (playlist) => {
  const newLikes = playlist.likeCount++;
  return newLikes;
};

const shuffleSongs = (songs) => {
  const shuffled = songs.sort((a, b) => 0.5 - Math.random());
  return shuffled;
};

populatePlaylists(data.playlists);

const formModal = document.getElementById("formModal");
const addSongButton = document.getElementById("addSong");
const newPlaylistForm = document.getElementById("newPlaylistForm");
const playlist = document.getElementById("playlist");

// Function to add a new set of fields for a song
function addSongFields(song = {}) {
  const songFieldsDiv = document.createElement("div");
  songFieldsDiv.classList.add("song-fields");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Title";
  titleInput.required = true;
  if (song.title) titleInput.value = song.title;

  const artistInput = document.createElement("input");
  artistInput.type = "text";
  artistInput.name = "artist";
  artistInput.placeholder = "Artist";
  artistInput.required = true;
  if (song.artist) artistInput.value = song.artist;

  const durationInput = document.createElement("input");
  durationInput.type = "text";
  durationInput.name = "duration";
  durationInput.placeholder = "Duration";
  durationInput.required = true;
  if (song.duration) durationInput.value = song.duration;

  songFieldsDiv.appendChild(titleInput);
  songFieldsDiv.appendChild(artistInput);
  songFieldsDiv.appendChild(durationInput);

  newPlaylistForm.insertBefore(songFieldsDiv, addSongButton);
}

// Event listener for adding song fields
addSongButton.addEventListener("click", addSongFields);

// Function to save the playlist
function savePlaylist(event) {
  event.preventDefault();
  const formData = new FormData(newPlaylistForm);
  const playlistData = {
    playlist_name: formData.get("playlistTitle"),
    playlist_creator: formData.get("playlistCreator"),
    playlist_art: formData.get("playlistArt")
      ? formData.get("playlistArt")
      : "./assets/img/playlist.png",
    songs: [],
    likeCount: 0,
  };

  // Get all songs
  for (let i = 0; i < formData.getAll("title").length; i++) {
    const song = {
      title: formData.getAll("title")[i],
      artist: formData.getAll("artist")[i],
      duration: `${Math.floor(
        Number.parseInt(formData.getAll("duration")[i]) / 60
      )}:${(Number.parseInt(formData.getAll("duration")[i]) % 60)
        .toString()
        .padStart(2, "0")}`,
      album: "Unknown album",
      cover_art: "./assets/img/song.png",
    };
    playlistData.songs.push(song);
  }

  updatePlaylistData(playlistData);
  newPlaylistForm.reset();

  const songFields = document.querySelectorAll(".song-fields");
  songFields.forEach((field, index) => {
    if (index !== 0) field.remove();
  });

  closeFormModal();
}

// Event listener for saving the playlist
newPlaylistForm.addEventListener("submit", savePlaylist);

// Function to render the playlist
const updatePlaylistData = (playlist) => {
  data.playlists.push(playlist);
  populatePlaylists(data.playlists);
};

const deletePlaylist = (playlist) => {
  const deletedProfile = data.playlists.find(
    (object) => JSON.stringify(object) === JSON.stringify(playlist)
  );

  // Filter out the playlist
  data.playlists = data.playlists.filter(
    (object) => JSON.stringify(object) !== JSON.stringify(playlist)
  );

  // Re-render the playlists
  populatePlaylists(data.playlists);

  // Return the deleted profile
  return deletedProfile;
};

function editPlaylist(playlist) {
  editing = true;
  deletedPlaylist = deletePlaylist(playlist);

  // Clear existing song fields
  const songFields = document.querySelectorAll(".song-fields");
  songFields.forEach((field, index) => {
    if (index !== 0) field.remove();
  });

  // Open the form modal
  openFormModal();

  // Pre-populate the form with playlist data
  document.querySelector("input[name='playlistTitle']").value =
    deletedPlaylist.playlist_name;
  document.querySelector("input[name='playlistCreator']").value =
    deletedPlaylist.playlist_creator;
  document.querySelector("input[name='playlistArt']").value =
    deletedPlaylist.playlist_art;

  songFields.forEach((field, index) => {
    if (index === 0) field.remove();
  });

  // Add and pre-populate song fields
  deletedPlaylist.songs.forEach((song) => addSongFields(song));
}

const openFormModal = () => {
  formModal.style.display = "block";
};

const closeFormModal = () => {
  formModal.style.display = "none";

  // Clear existing song fields
  const songFields = document.querySelectorAll(".song-fields");
  songFields.forEach((field, index) => {
    if (index !== 0) field.remove();
    else
      field
        .querySelectorAll("input")
        .forEach((inputField) => (inputField.value = ""));
    //TODO: Remove any remaining values from the remianing
  });

  // TODO: Remove values from headers
  document.querySelector("input[name='playlistTitle']").value = "";
  document.querySelector("input[name='playlistCreator']").value = "";
  document.querySelector("input[name='playlistArt']").value = "";
};

// ----------------------- SEARCH BAR FEATURE ----------------------- //
// Search Bar
const searchBar = document.getElementById("searchBar");

// Event listener for search bar input
searchBar.addEventListener("input", (event) => {
  filterPlaylists(event.target.value);
});

// Function to filter playlists based on search query
function filterPlaylists(query) {
  const filteredPlaylists = data.playlists.filter(
    (obj) =>
      obj.playlist_name.toLowerCase().includes(query.toLowerCase()) ||
      obj.playlist_creator.toLowerCase().includes(query.toLowerCase())
  );
  populatePlaylists(filteredPlaylists);
}

// ----------------------- SORT DROPDOWN FEATURE ----------------------- //
const sortDropdown = document.getElementById("sortDropdown");

// Event listener for sort dropdown
sortDropdown.addEventListener("change", (event) => {
  sortPlaylists(event.target.value);
});

const sortPlaylists = (option) => {
  // let sortedPlaylists;
  switch (option) {
    case "name-asc":
      sortedPlaylists = sortedPlaylists.sort((a, b) =>
        a.playlist_name.localeCompare(b.playlist_name)
      );
      break;
    case "name-desc":
      sortedPlaylists = sortedPlaylists.sort((a, b) =>
        b.playlist_name.localeCompare(a.playlist_name)
      );
      break;
    case "likes-asc":
      sortedPlaylists = sortedPlaylists.sort(
        (a, b) => a.likeCount - b.likeCount
      );
      break;
    case "likes-desc":
      sortedPlaylists = sortedPlaylists.sort(
        (a, b) => b.likeCount - a.likeCount
      );
      break;
    default:
      // sortedPlaylists = sortedPlaylists;
      break;
  }
  populatePlaylists(sortedPlaylists);
};
