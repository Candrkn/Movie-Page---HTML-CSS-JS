const apiKey = "407af6185e7156944ecbd76e97c0de62";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w400";
const creditsUrl ="https://image.tmdb.org/t/p/w200";

const urlParams = new URLSearchParams(window.location.search);
const serieId = urlParams.get("id");
console.log(serieId)

// Serie Details URL ;

const seriesUrl = `${baseUrl}/tv/${serieId}?api_key=${apiKey}`;

// Cast Members URL ;

const castMembers = `${baseUrl}/tv/${serieId}/credits?api_key=${apiKey}`;

fetch(seriesUrl)
.then(response=>response.json())
.then((data)=>{
    console.log(data)
    seriesInfo(data);
})

const seriesInfo = (data) => {

    const serieDetayWrapper = document.querySelector(".serie-detay-wrapper");

    const seriesDate = new Date(data.first_air_date).toLocaleDateString("en-US",{
        year : "numeric",
        month : "long",
        day : "numeric",
    });

    const genreNames = data.genres.map((genre)=> genre.name).slice(0,2)

    serieDetayWrapper.innerHTML =`
        <div class="serie-detay">
                <img src="${imageUrl}${data.poster_path}" alt="">
                <div class="film-bilgileri">
                    <h2>${data.name}</h2>
                    <p><strong>Categorie:</strong>${genreNames}</p>
                    <p><strong>Release Date:</strong>${seriesDate}</p>
                    <p><strong>IMDB Score:</strong>${data.vote_average}</p>
                    <p><strong>Summary:</strong>${data.overview}</p>
                 </div>
        </div>
    `
}

// Cast Members ;

fetch(castMembers)
.then(response=>response.json())
.then((data)=>{
    console.log(data.cast)
    showCastMembers(data.cast);
})

const showCastMembers = (cast) =>{
    cast.slice(0,8).forEach((oyuncu)=>{
        const castWrapper = document.querySelector(".oyuncular-wrapper")

        let castPicture;

        if (oyuncu.profile_path) {
            castPicture = `${creditsUrl}${oyuncu.profile_path}`;
        } else {
            castPicture = `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;
        }
        

        castWrapper.innerHTML += `
        <div class="oyuncu-card">
                <img src="${castPicture}" alt="">
                <h4>Marlon Brando</h4>
                <p><strong>Role:</strong>Don Vito Corleone</p>
            </div>
        `
    })
}