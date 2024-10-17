const apiKey = "407af6185e7156944ecbd76e97c0de62";
const baseUrl = "https://api.themoviedb.org/3";
const popularFilms = `${baseUrl}/movie/popular?api_key=${apiKey}`;
const upcomingFilms = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topratedFilms = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const moviesWrapper = document.querySelector(".movies-wrapper");

// ! Url for Movie src

const imageUrl = "https://image.tmdb.org/t/p/w200";

// ! Url for Movies catagories

const movieList = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;

// ! Object for category info
let genresMap = {};
console.log(genresMap);

// ! Movie Filter Based on Categories
const popular = document.querySelector("#popular");
const upcoming = document.querySelector("#upcoming");
const toprated = document.querySelector("#toprated");

const movieInfoCategories = () =>{
    fetch(movieList)
    .then(response => response.json())
    .then((data)=>{
        data.genres.forEach((genre)=>{
            genresMap[genre.id] = genre.name;
        })
    })
}

movieInfoCategories();


// ! TopRated Films

fetch(topratedFilms)
.then(response => response.json())
.then((data)=>{
    printMovieInfo(data);
})

const printMovieInfo = (data) =>{
    data.results.forEach((veri)=>{
        const posterPath = veri.poster_path;
        const genreNames = veri.genre_ids.map((id) => genresMap[id]).slice(0,2);
        const date = new Date(veri.release_date);
        const formattedDate = date.toLocaleDateString("en-US",{
            day : "numeric",
            month : "long",
            year : "numeric",
        })

        // Movie-Card
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.id = veri.id;

        movieCard.addEventListener("click", function(){
            window.location.href = `detay.html?id=${veri.id}`
        })

        // Card Info
        movieCard.innerHTML = `
        <img src="${imageUrl}${posterPath}" alt="">
        <div class="movie-info">
            <h4>${veri.title}</h4>
            <p>${genreNames}</p>
            <p>${formattedDate}</p>
            <h6><span>IMDB</span><i class="fa-solid fa-star">${(veri.vote_average).toFixed(1)}</i></h6>
        </div>`

        moviesWrapper.append(movieCard);
    })

}

// ! To Bring Popular Movies

popular.addEventListener("click", function(){
    movieInfoCategories();
    printPopularMovies();
})

const printPopularMovies = () => {
    fetch(popularFilms)
    .then(response => response.json())
    .then((data) => {
        moviesWrapper.innerHTML = "";
        printMovieInfo(data)
    })
}

// ! To Bring Upcoming Movies

upcoming.addEventListener("click", function(){
    movieInfoCategories();
    printUpcomingMovies();
})

const printUpcomingMovies = () => {
    fetch(upcomingFilms)
    .then(response => response.json())
    .then((data) => {
        moviesWrapper.innerHTML = "";
        printMovieInfo(data)
    })
}

// ! To Bring TopRated Movies

toprated.addEventListener("click", function(){
    movieInfoCategories();
    printTopRatedMovies();
})

const printTopRatedMovies = () => {
    fetch(topratedFilms)
    .then(response => response.json())
    .then((data) => {
        moviesWrapper.innerHTML = "";
        printMovieInfo(data)
    })
}