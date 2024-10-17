const apiKey = "407af6185e7156944ecbd76e97c0de62";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w200";

// ! Getting Movie ID From URL;

const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get("id");
console.log(filmId)

// ! Movie Details API URL;

const movieDetailsUrl = `${baseUrl}/movie/${filmId}?api_key=${apiKey}`;

// ! Movie details wrapper

const filmWrapper = document.querySelector(".film-detay-wrapper")

fetch(movieDetailsUrl)
.then(response => response.json())
.then((data)=>{
    console.log(data)
    filmWrapper.innerHTML = `
    div class="film-detay">
                <img src="https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" alt="">
                <div class="film-bilgileri">
                    <h2>${data.title}</h2>
                    <p><strong>Categorie:</strong>Drama,Crime</p>
                    <p><strong>Release Date:</strong>${data.relase_date}</p>
                    <p><strong>IMDB Score:</strong>8.7</p>
                    <p><strong>Summary:</strong>${data.overview}</p>
                </div>
            </div>
    `
})
