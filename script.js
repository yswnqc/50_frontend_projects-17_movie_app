const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// const main = document.getElementById("main");
const form = document.forms.search;
const template = document.querySelector(".template");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
  //   console.log(data.results);
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = template.cloneNode(true);
    movieEl.classList.remove("template");

    movieEl.querySelector(".title").textContent = title;
    movieEl.querySelector("img").src = IMG_PATH + poster_path;
    movieEl.querySelector("span").textContent = vote_average.toFixed(1);
    movieEl.querySelector("span").classList = getClassByRate(vote_average);
    movieEl.querySelector(".overview").textContent = overview;

    template.after(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = e.target.elements.search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    e.target.elements.search.value = "";
  } else {
    window.location.reload();
  }
});
