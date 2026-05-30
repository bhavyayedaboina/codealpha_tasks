const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const playlistBtn = document.getElementById("playlistBtn");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");
const volumeBtn = document.getElementById("volumeBtn");
const volumePopup = document.querySelector(".volume-popup");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const favBtn = document.getElementById("favBtn");
const favoriteList = document.getElementById("favoriteList");

const playlist = document.getElementById("playlist");

let favoriteSongs = [];

const songs = [
  {
    title:"Inthandham song (SitaRamam) 🎶",
    artist:"SPB Charan",
    path:"songs/Inthandham.mp3",
    cover:"images/sitaramam.jpeg"
   },
   
  {
   title:"I Wanna Be Yours 🎶",
   artist:"Alex Turner",
   path:"songs/I-Wanna-Be-Yours.mp3",
   cover:"images/bhavya.png"
  },
  
  {
    title:"Kollagotte Song 🎶",
    artist:"Anirudh Ravichander",
    path:"songs/Kollagotte.mp3",
    cover:"images/kollagotte.jpeg"
   },
   
  {
    title:"Adhento Gaani Vunnapaatuga 🎶",
    artist:"Anirudh Ravichander",
    path:"songs/Adhento Gaani Vunnapaatuga .mp3",
    cover:"images/hi_nanna.jpeg"
   },
   
  {
    title:"Amma Amma Nee Vennela 🌍",
    artist:"Sid Sriram",
    path:"songs/Amma Amma Nee Vennela.mp3",
    cover:"images/Amma.jpeg"
  }
 ];

let songIndex = 0;

let isPlaying = false;

//loading the songs function
function loadSong(index)
{
 title.innerText=songs[index].title;
 artist.innerText=songs[index].artist;
 audio.src=songs[index].path;
 cover.src=songs[index].cover;
 
 updateFavoriteIcon();
}

function formatSongTime(time)
{
let minutes = Math.floor(time / 60);
let seconds = Math.floor(time % 60);

if(seconds < 10)
{
seconds = "0" + seconds;
}

return minutes + ":" + seconds;
}

function playSong()
{
audio.play();

isPlaying = true;

playBtn.innerText = "⏸️";

cover.style.animationPlayState = "running";
}

function pauseSong()
{
audio.pause();

isPlaying = false;

playBtn.innerText = "▶️";

cover.style.animationPlayState = "paused";
}

playBtn.addEventListener("click", function(){

if(isPlaying)
{
pauseSong();
}
else
{
playSong();
}

});

songs.forEach(function(song,index){

const songDiv = document.createElement("div");

songDiv.classList.add("song-item");

songDiv.innerText = song.title;

songDiv.addEventListener("click",function(){

songIndex = index;

loadSong(songIndex);

playSong();

});

playlist.appendChild(songDiv);

});

playlistBtn.addEventListener("click",function(){

if(playlist.style.display === "block")
{
playlist.style.display = "none";
}
else
{
playlist.style.display = "block";
}

});

function nextSong()
{
songIndex++;

if(songIndex >= songs.length)
{
songIndex = 0;
}

loadSong(songIndex);

playSong();
}

function prevSong()
{
songIndex--;

if(songIndex < 0)
{
songIndex = songs.length - 1;
}

loadSong(songIndex);

playSong();
}

nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);

audio.addEventListener("timeupdate",function(){

if(audio.duration)
{
progress.value =
(audio.currentTime / audio.duration) * 100;
}

currentTimeEl.innerText =
formatSongTime(audio.currentTime);

if(!isNaN(audio.duration))
{
durationEl.innerText =
formatSongTime(audio.duration);
}

});

progress.addEventListener("input",function(){

audio.currentTime =
(progress.value * audio.duration) / 100;

});

volume.addEventListener("input",function(){

audio.volume = volume.value;

});

volumeBtn.addEventListener("click",function(){

if(volumePopup.style.display === "block")
{
volumePopup.style.display = "none";
}
else
{
volumePopup.style.display = "flex";
}

});

function updateFavoriteIcon()
{
let currentSong = songs[songIndex];

let found = favoriteSongs.find(function(song){

return song.title === currentSong.title;

});

if(found)
{
favBtn.innerText = "❤️";
}
else
{
favBtn.innerText = "🤍";
}
}

favBtn.addEventListener("click",function(){

let currentSong = songs[songIndex];

let alreadyAdded = favoriteSongs.find(function(song){

return song.title === currentSong.title;

});

if(!alreadyAdded)
{
favoriteSongs.push(currentSong);

const favSong = document.createElement("div");

favSong.classList.add("favorite-song");

favSong.innerText = currentSong.title + " 🎶";

favoriteList.appendChild(favSong);
}

updateFavoriteIcon();

});

audio.addEventListener("ended",nextSong);

audio.volume = 0.5;
volume.value = 0.5;

loadSong(songIndex);
