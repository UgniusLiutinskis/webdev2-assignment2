// Song Cards page: same data as the Playlist page but shown with Handlebars
const songCards = document.querySelector("#songCards");
const message = document.querySelector("#message");

// Get the template from the page and compile it into a function
let template = Handlebars.compile(document.querySelector("#songs-template").innerHTML);

// Shows a list of songs as cards
const displaySongs = (list) => {
  message.textContent = `Showing ${list.length} of ${songs.length} songs`;

  let thecontent = template(list);
  songCards.innerHTML = thecontent;
};

displaySongs(songs);

// Delete a song
songCards.addEventListener("click", (evt) => {
  if (evt.target.matches("button")) {
    let deleteRec = songs.findIndex((song) => song.id === parseInt(evt.target.dataset.id));

    if (confirm(`Delete ${songs[deleteRec].title}?`)) {
      songs.splice(deleteRec, 1);
      saveSongs();
      displaySongs(songs);
    }
  }
});

// Open and close the Add a Song dialog
const dialog = document.querySelector("dialog");
const songForm = document.querySelector("#songForm");

// Increases next id everytime a new song is added
let nextId = 1;
songs.forEach((song) => {
  if (song.id >= nextId) {
    nextId = song.id + 1;
  }
});

document.querySelector("#toggle").addEventListener("click", () => {
  dialog.showModal();
});

document.querySelector("#close").addEventListener("click", () => {
  dialog.close();
});

// Add a song
const addSong = () => {
  let length = songForm.elements.songLength.value;
  let year = parseInt(songForm.elements.year.value);

  if (!length.includes(":")) {
    alert("Please enter the length like 3:45");
  } else if (year > new Date().getFullYear()) {
    alert("The year can't be in the future");
  } else {
    const newSong = {
      id: nextId,
      title: capitalise(songForm.elements.songTitle.value),
      artist: capitalise(songForm.elements.artist.value),
      genre: songForm.elements.genre.value,
      length: length,
      year: year,
      rating: parseInt(songForm.elements.rating.value),
      favourite: songForm.elements.favourite.checked,
    };

    nextId++;
    songs.push(newSong);
    saveSongs();

    displaySongs(songs);

    songForm.reset();
    dialog.close();
  }
};

songForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addSong();
});

// Search by title or artist
const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let term = searchForm.elements.search.value.toLowerCase();

  const results = songs.filter((song) =>
    song.title.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term));

  displaySongs(results);
});

// Show every song again
document.querySelector("#showAll").addEventListener("click", () => {
  searchForm.reset();
  displaySongs(songs);
});

// Filter by genre
const genreFilter = document.querySelector("#genreFilter");

genreFilter.addEventListener("change", () => {
  let genre = genreFilter.value;

  if (genre === "All") {
    displaySongs(songs);
  } else {
    const matches = songs.filter((song) => song.genre === genre);
    displaySongs(matches);
  }
});
