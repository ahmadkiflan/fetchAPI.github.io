const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async () => {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (error) {
    alert(error);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=d34f01ee&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(x) {
  let cards = "";
  x.forEach((movie) => (cards += showCard(movie)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    try {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIDetail(movieDetail);
    } catch (error) {
      console.log(error);
    }
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=d34f01ee&i=" + imdbid)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response;
    });
}

function updateUIDetail(response) {
  const movieDetail = showMovieDetail(response);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showCard(x) {
  return `<div class="col-md-3 my-3">
            <div class="card">
            <img src="${x.Poster}" class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">${x.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${x.Year}</h6>
                <a href="#" class="btn btn-danger modal-detail-button"data-toggle="modal"
                data-target="#movieDetailModal" data-imdbid="${x.imdbID}">Show Details</a>
            </div>
            </div>
            </div>`;
}

function showMovieDetail(x) {
  return `<div class="container-fluid">
                  <div class="row">
                  <div class="col-md-5">
                  <img src="${x.Poster}" class="img-fluid"/>
                  </div>
                  <div class="col-md">
                      <ul class="list-group">
                          <li class="list-group-item"><h5>${x.Title} (${x.Year})</h5></li>
                          <li class="list-group-item"><strong>Released:</strong> ${x.Released}</li>
                          <li class="list-group-item"><strong>Director:</strong> ${x.Director}</li>
                          <li class="list-group-item"><strong>Writer:</strong> ${x.Writer}</li>
                          <li class="list-group-item"><strong>Actor:</strong>  ${x.Actors}</li>
                          <li class="list-group-item"><strong>Plot:</strong>  ${x.Plot}</li>
                          <li class="list-group-item"><strong>Language:</strong>  ${x.Language}</li>
                          <li class="list-group-item"><strong>Country:</strong>  ${x.Country}</li>
                      </ul>
                  </div>
                  </div>
              </div>`;
}
