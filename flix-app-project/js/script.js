const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "df8a3e2ae7829062beeaf8473d0e894c",
    apiUrl: "https://api.themoviedb.org/3/",
  },
}

// Display Popular Movies
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData("movie/popular")
  // console.log(results)
  results.forEach((movie) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = ` 
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
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
    document.getElementById("popular-movies").appendChild(div)
  })
}

// Display Popular TV Shows
const displayPopularTvShows = async () => {
  const { results } = await fetchAPIData("tv/popular")
  // console.log(results)
  results.forEach((show) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = ` 
          <a href="tv-details.html?id=${show.id}">${
      show.poster_path
        ? `
            <img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="Show Title"
            />`
        : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.title}"
                />`
    }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        `
    document.getElementById("popular-shows").appendChild(div)
  })
}

// Display Movie Details
const displayMovieDetails = async () => {
  const movieId = window.location.search.split("=")[1]
  const movie = await fetchAPIData(`movie/${movieId}`)
  // console.log(movie)

  // Overlay for background image
  displayBackgroundImage("movie", movie.backdrop_path)

  const div = document.createElement("div")
  div.innerHTML = ` <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `
                  <img
                      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="Show Title"
                  />`
              : `<img
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
              ${movie.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")}   
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${numberWithCommas(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> ${numberWithCommas(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span>  ${
              movie.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span >${company.name}</span>`)
            .join(", ")}</div>
          </div>
        </div>`
  document.getElementById("movie-details").appendChild(div)
}
// Display TVShow Details
const displayShowDetails = async () => {
  const showId = window.location.search.split("=")[1]
  const show = await fetchAPIData(`tv/${showId}`)
  console.log(show)

  // Overlay for background image
  displayBackgroundImage("show", show.backdrop_path)

  const div = document.createElement("div")
  div.innerHTML = ` <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `
                  <img
                      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="Show Title"
                  />`
              : `<img
                        src="images/no-image.jpg"
                        class="card-img-top"
                        alt="${show.name}"
                      />`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.release_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")}   
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
           <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }

            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span >${company.name}</span>`)
            .join(", ")}</div>
          </div>
        </div>`
  document.getElementById("show-details").appendChild(div)
}

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div")
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
  overlayDiv.style.backgroundSize = "cover"
  overlayDiv.style.backgroundPosition = "center"
  overlayDiv.style.backgroundRepeat = "no-repeat"
  overlayDiv.style.height = "100vh"
  overlayDiv.style.width = "100vw"
  overlayDiv.style.position = "absolute"
  overlayDiv.style.top = "0"
  overlayDiv.style.left = "0"
  overlayDiv.style.zIndex = "-1"
  overlayDiv.style.opacity = "0.1"

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv)
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv)
  }
}

// Search Movies/Shows
async function search() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  global.search.type = urlParams.get("type")
  global.search.term = urlParams.get("search-term")

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData()

    global.search.page = page
    global.search.totalPages = total_pages
    global.search.totalResults = total_results

    if (results.length === 0) {
      showAlert("No results found", "success")
      return
    }

    displaySearchResults(results)

    document.getElementById("search-term").value = ""
  } else {
    showAlert("Please enter a search term")
  }
}

// Display Search Results
const displaySearchResults = (results) => {
  // Clear previous search results
  document.getElementById("search-results").innerHTML = ""

  document.getElementById("search-results-heading").innerHTML = ""

  document.getElementById("pagination").innerHTML = ""
  results.forEach((result) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = ` 
        <a href="${global.search.type}.html?id=${result.id}">${
      result.poster_path
        ? `
          <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
            class="card-img-top"
            alt="${global.search.type === "movie" ? result.title : result.name}"
          />`
        : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }"
              />`
    }
        </a>
        <div class="card-body">
          <h5 class="card-title">${
            global.search.type === "movie" ? result.title : result.name
          }</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${
              global.search.type === "movie"
                ? result.release_date
                : result.first_air_date
            }</small>
          </p>
        </div>
      `
    document.getElementById(
      "search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} for ${global.search.term}</h2>`
    document.getElementById("search-results").appendChild(div)
  })

  displayPagination()
}

// Display Pagination for search results
const displayPagination = () => {
  const div = document.createElement("div")
  div.classList.add("pagination")
  div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `
  document.getElementById("pagination").appendChild(div)

  //Disable prev button on first page
  if (global.search.page === 1) {
    document.getElementById("prev").disabled = true
  }

  //Disable next button on last page
  if (global.search.page === global.search.totalPages) {
    document.getElementById("next").disabled = true
  }

  //Next Page
  document.getElementById("next").addEventListener("click", async () => {
    global.search.page++
    const { results, total_pages } = await searchAPIData()
    displaySearchResults(results)
  })
  //Prev Page
  document.getElementById("prev").addEventListener("click", async () => {
    global.search.page--
    const { results, total_pages } = await searchAPIData()
    displaySearchResults(results)
  })
}

//Dislay slider movies
const displaySlider = async () => {
  const { results } = await fetchAPIData("movie/now_playing")
  // console.log(results)

  results.forEach((movie) => {
    const div = document.createElement("div")
    div.classList.add("swiper-slide")
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}"> 
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
          </h4>
        `
    document.querySelector(".swiper-wrapper").appendChild(div)

    initSwiper()
  })
}
const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  })
}

//Fetch data from the  TMDB API
const fetchAPIData = async (endpoint) => {
  const API_Key = global.api.apiKey
  const API_URL = global.api.apiUrl

  showSpinner()

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_Key}&language=en-US`
  )

  const data = await response.json()

  hideSpinner()

  return data
}

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show")
}
const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show")
}

// Make Request To Search
const searchAPIData = async () => {
  const API_KEY = global.api.apiKey
  const API_URL = global.api.apiUrl

  showSpinner()

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  )

  const data = await response.json()

  hideSpinner()

  return data
}

// Hightlight the current page in the navbar
const HightlightActivePage = () => {
  const links = document.querySelectorAll(".nav-link")
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

//Show Alert
const showAlert = (message, className = "error") => {
  const alertEl = document.createElement("div")
  alertEl.classList.add("alert", className)
  alertEl.appendChild(document.createTextNode(message))
  document.getElementById("alert").appendChild(alertEl)

  setTimeout(() => {
    alertEl.remove()
  }, 3000)
}

// Format number with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

//init App
const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies()
      displaySlider()
      break
    case "/shows.html":
      displayPopularTvShows()
      break
    case "/movie-details.html":
      displayMovieDetails()
      break
    case "/tv-details.html":
      displayShowDetails()
      break
    case "/search.html":
      search()
      break
  }
  HightlightActivePage()
}
init()
