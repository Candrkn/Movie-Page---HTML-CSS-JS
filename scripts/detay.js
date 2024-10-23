const apiKey = "407af6185e7156944ecbd76e97c0de62";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w400";

// ! Getting Movie ID From URL;

const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get("id");
console.log(filmId)

// ! Movie Details API URL;

const movieDetailsUrl = `${baseUrl}/movie/${filmId}?api_key=${apiKey}`;

// ! Cast Members API ;

const castUrl = `${baseUrl}/movie/${filmId}/credits?api_key=${apiKey}`

// ! Movie Trailer URL;
const filmVideoUrl = `${baseUrl}/movie/${filmId}/videos?api_key=${apiKey}`;

// ! Movie details wrapper

const filmWrapper = document.querySelector(".film-detay-wrapper")

//  To Show Movie Details

const showMovieInfo = (data) => {
    const posterPath = data.poster_path ? `${imageUrl}${data.poster_path}` : `https://www.reelviews.net/resources/img/default_poster.jpg`

    const genreNames = data.genres.map((genre)=> genre.name)

    const releaseDate = new Date(data.release_date).toLocaleDateString("en-US",{
        year : "numeric",
        month : "long",
        day : "numeric",
    });

    filmWrapper.innerHTML = `
    <div class="film-detay">
        <img src="${posterPath}" alt="">
        <div class="film-bilgileri">
            <h2>${data.title}</h2>
            <p><strong>Categorie:</strong>${genreNames}</p>
            <p><strong>Release Date:</strong>${releaseDate}</p>
            <p><strong>IMDB Score:</strong>${(data.vote_average).toFixed(1)}</p>
            <p><strong>Summary:</strong>${data.overview}</p>
            <button class="fragman-izle-btn">Trailer</button>
        </div>
    </div>
    `
    document.querySelector(".fragman-izle-btn").addEventListener("click", fragmanBilgileriniAl);
}

const showMovieCast = (cast) => {
    const castWrapper = document.querySelector(".oyuncular-wrapper")
    cast.slice(0,10).forEach((oyuncu)=>{
        const oyuncuImageUrl = oyuncu.profile_path ? `${imageUrl}${oyuncu.profile_path}` : `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;

        // Create Cast Card;
        const oyuncuCard = document.createElement("div");
        oyuncuCard.classList.add("oyuncu-card");
        oyuncuCard.style.width ="250px";

        oyuncuCard.innerHTML = `
         <img src="${oyuncuImageUrl}" alt="">
         <h4>${oyuncu.original_name}</h4>
         <p><strong>Role:</strong>${oyuncu.character}</p>
        `
        castWrapper.append(oyuncuCard)
    })

}

fetch(movieDetailsUrl)
.then(response => response.json())
.then((data)=>{
    // console.log(data)
   showMovieInfo(data);
})


// Cast Members Info

fetch(castUrl)
.then(response => response.json())
.then((data)=>{
    showMovieCast(data.cast);
})

// Movie Trailers

const fragmanBilgileriniAl = () => {
    fetch(filmVideoUrl)
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        const fragman = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        // console.log(fragman)
        
        if(fragman){
            const fragmanUrl = `https://www.youtube.com/watch?v=${fragman.key}`
            window.open(fragmanUrl, "_blank")
        }else{
            alert("Bu filme ait fragman bulunamadı!")
        }
    })
}