// ! Left and Right Buttons

const leftBtn = document.querySelector("#left_btn");
const rightBtn = document.querySelector("#right_btn");
const cards = document.querySelector(".cards");

leftBtn.addEventListener("click", function () {
    cards.scrollLeft -= 140;
});

rightBtn.addEventListener("click", function () {
    cards.scrollLeft += 140;
});

// ! Play and Stop Function

const videoPlayer = () => {
  const play = document.querySelector("#play");
  const video = document.querySelector("video");

  play.addEventListener("click", function(){
    if(video.paused){
        play.innerHTML = `Play <i class="fa-solid fa-pause"></i>`
        video.play();
    }else{
        play.innerHTML = `Watch <i class="fa-solid fa-play"></i>`
        video.pause();
    }
  })
}

videoPlayer();

// ! Download Function

const videoDownload = () => {
    const downloadBtn = document.querySelector("#download_main");

    downloadBtn.addEventListener("click", () => {
        const video = document.querySelector("video");
        const videoSource = video.src;

        const downloadLink = document.createElement("a");
        downloadLink.href = videoSource;

        downloadLink.download = "video.mp4";

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
    })
};

videoDownload();


// ! Fetching Json

const url = "movie.json"

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((movie) => {
            movieInfo(movie)
        })
        backGround(data);
    });


const movieInfo = (movie) => {
    cards.innerHTML += `
    <a href="#" class="card" data-video="video/${movie.trailer}">
                <img class="poster" src="${movie.sposter}" alt="">
                <div class="rest_card">
                    <img src="${movie.bposter}" alt="">
                    <div class="cont">
                        <h4>J${movie.name}</h4>
                        <div class="sub">
                            <p>${movie.genre},${movie.date}</p>
                            <h3><span>IMDB</span><i class="fa-solid fa-star"></i>${movie.imdb}</h3>
                        </div>
                    </div>
                </div>
            </a>
    `
};

const backGround = (data) => {
    const indexVideo = document.querySelector("#index-video");
    const movieCards = document.querySelectorAll(".card")
    
    movieCards.forEach((movieCard, index)=>{
      movieCard.addEventListener("click", function(){
        const trailer = movieCard.getAttribute("data-video");
        
        if(trailer){
            indexVideo.src = trailer
        }
        if(trailer == "video/"){
            indexVideo.src = `${trailer}johnwick.webm`
        }

        selectedMovie = data[index];
        const content = document.querySelector(".content");

        content.innerHTML = `
        <h1 id="title">${selectedMovie.name}</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat quidem ipsum aperiam dignissimos quod
                dicta nesciunt, ipsa impedit aut. Placeat saepe et fugiat blanditiis illum reprehenderit est enim
                laboriosam consectetur.</p>
            <div class="details">
                <h6>A Netflix Original Film</h6>
                <h6 id="gen">${selectedMovie.genre}</h6>
                <h6>${selectedMovie.date}</h6>
                <h6 id="rate"><span>IMDB</span><i class="bi bi-star-fill">${selectedMovie.imdb}</i></h6>
            </div>
            <div class="btns">
                <a href="#" id="play">Watch <i class="bi bi-play-fill"></i></a>
                <a href="#" id="download_main">Download <i class="bi bi-cloud-arrow-down-fill"></i></a>
            </div>
        `

        videoPlayer();
        videoDownload();

      })
    })


    

}