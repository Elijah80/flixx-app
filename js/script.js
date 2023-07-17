const global = {
  currentPage: window.location.pathname,
};

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="Movie Title"
          />` : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
          />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `

    document.querySelector('#popular-movies').appendChild(div);
  })
}

// Display popular tv shows
async function displayPopularShows(){
  const { results } = await fetchAPIData('tv/popular');

  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="Show Title"
      />` : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Show Title"
      />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${show.first_air_date}</small>
      </p>
    </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  })
}

// Display movie details
async function displayMovieDetails(){
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for backdrop image
  displayBackdropImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
    <div>
      ${
        movie.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />` : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />`
      }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${
        movie.production_companies.map((company) =>
          `<span>${company.name}</span>`
        ).join(', ')
      }
    </div>
  </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}

// Display tv show details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);
  
  // Overlay for backdrop image
  displayBackdropImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
    <div>
    <div>
    ${
      show.poster_path ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.title}"
    />` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.title}"
    />`
    }
  </div>
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">First Aired: ${show.first_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${addCommasToNumber(show.number_of_episodes)}</li>
      <li>
        <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
      </li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${
      show.production_companies.map((company) =>
        `<span>${company.name}</span>`
      ).join(', ')
    }</div>
  </div>
  `;

  document.querySelector('#show-details').appendChild(div);
}

// Display backdrop on details pages
function displayBackdropImage(type, backdropPath) {
  const overLayDiv = document.createElement('div');
  overLayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
  overLayDiv.style.backgroundSize = 'cover';
  overLayDiv.style.backgroundPosition = 'center';
  overLayDiv.style.backgroundRepeat = 'no-repeat';
  overLayDiv.style.height = '100vh';
  overLayDiv.style.width = '100vw';
  overLayDiv.style.position = 'absolute';
  overLayDiv.style.top = '0';
  overLayDiv.style.left = '0';
  overLayDiv.style.zIndex = '-1';
  overLayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overLayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overLayDiv);
  }
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '60e0764696653e76f66216b0e0f8165f';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&region=US`);

  const data = await response.json();

  hideSpinner();

  return data;
}

// Toggle Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active page
function highlightActivePage(){
  const activeLink = document.querySelectorAll('.nav-link');

  activeLink.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage){
      link.classList.add('active');
    }
  })
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Initialize App
function init() {
  switch(global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActivePage();
}

document.addEventListener('DOMContentLoaded', init);