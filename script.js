const audio=document.getElementById("audio");
const playBtn=document.getElementById("play");
const nextBtn=document.getElementById("next");
const prevBtn=document.getElementById("prev");
const playlistBtn=document.getElementById("playlistBtn");
const cover=document.getElementById("cover");
const title=document.getElementById("title");
const progress=document.getElementById("progress");
const volume=document.getElementById("volume");
const currentTimeEl=document.getElementById("currentTime");
const durationEl=document.getElementById("duration");
const volumeBtn=document.getElementById("volumeBtn");
const volumePopup=document.querySelector(".volume-popup");
const favBtn=document.getElementById("favBtn");
const favoriteList=document.getElementById("favoriteList");
const artist=document.getElementById("artist");
let favoriteSongs=[];

   
//storing all the songs in the array of songs
const songs=[
  
   {
     title:"Inthandham song(SitaRamam) 🎶️",
     artist:"SPB Charan",
     path:"songs/Inthandham.mp3" ,
     cover:"images/cute.jpeg"
   },
   {
     title:"I wanna be yours song 🎶️",
     artist:"Alex Turner",
     path:"songs/I-Wanna-Be-Yours.mp3",
     cover:"images/bhavya.png"
   },
    {
     title:"Kollagotte song 🎶️",
     artist:"Anirudh Ravichander",
     path:"songs/Kollagotte.mp3",
     cover:"images/anju.jpeg"
   },
   {
     title:"Adhento Gaani Vunnapaatuga song 🎶️",
     artist:"Anirudh Ravichander",
     path:"songs/Adhento Gaani Vunnapaatuga .mp3",
     cover:"images/friends.jpeg"
   },
   {
     title:"Amma Amma Neevennela song 🌍️",
     artist:"Sid Sriram",
     path:"songs/Amma Amma Nee Vennela.mp3",
     cover:"images/mom.jpeg"
   }
]
//current song index
let songIndex=0;

//song playing state initially false
let isPlaying=false;

//loading the songs function
function loadSong(index)
{
 title.innerText=songs[index].title;
 artist.innerText=songs[index].artist;
 audio.src=songs[index].path;
 cover.src=songs[index].cover;
 
 updateFavoriteIcon();
}

//song play time
function formateSong(time)
{
  let minutes=Math.floor(time/60);
  let seconds=Math.floor(time%60);
  if(seconds<10)
  {
   seconds="0"+seconds;
  }
  return minutes+":"+seconds;
}   

//play song function
function playSong()
{
  audio.play();
  isPlaying=true;
  playBtn.innerText="⏸️";
  cover.style.animationPlayState="running";
}

//pause song function
function pauseSong()
{
  audio.pause();
  isPlaying=false;
  playBtn.innerText="◀️"; 
  cover.style.animationPlayState="paused";
}

//toggle song(play or pause songs)
playBtn.addEventListener("click",function(){
   if(isPlaying)
   {
    pauseSong();
   }
   else{
    playSong();
    }
} ); 

//playlist using loops
const playlist=document.getElementById("playlist");
songs.forEach(function(song,index){
    const songDiv=document.createElement("div");
    songDiv.innerText=song.title;
    songDiv.classList.add("song-item");
    songDiv.addEventListener("click",function(){
    songIndex=index;
    loadSong(songIndex);
    playSong();
 }); 
 playlist.appendChild(songDiv);
});

//playlist display
playlistBtn.addEventListener("click",function(){
     if(playlist.style.display==="block")
     {
       playlist.style.display="none";
     }
     else{
       playlist.style.display="block";
      }
 });
          
//next song runnning function
function nextSong()
{
 songIndex++;
 if(songIndex>=songs.length)
 {
   songIndex=0;
 }
 loadSong(songIndex);
 playSong();
}

//previous song function
function prevSong()
{
 songIndex--;
 if(songIndex <0)
 {
   songIndex=songs.length-1;
 }
 loadSong(songIndex);
 playSong();
}

//next and previous buttons actions
nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);

//update progress bar
audio.addEventListener("timeupdate",function(){
    
    progress.value=(audio.currentTime/audio.duration)*100;
    
    currentTimeEl.innerText=formateSong(audio.currentTime);
    durationEl.innerText=formateSong(audio.duration);
    
});

//volume control
volume.addEventListener("input",function(){
      audio.volume=volume.value;
});  
volumeBtn.addEventListener("click",function(){

   if(volumePopup.style.display==="block")
   {
      volumePopup.style.display="none";
   }

   else{

      volumePopup.style.display="block";
   }

});    


function updateFavoriteIcon()
{
   let currentSong=songs[songIndex];

   let found=favoriteSongs.find(function(song){

      return song.title===currentSong.title;

   });

   if(found)
   {
      favBtn.innerText="❤️";
   }
   else
   {
      favBtn.innerText="🤍";
   }
}


// FAVORITE BUTTON

favBtn.addEventListener("click",function(){

   let currentSong=songs[songIndex];

   let alreadyAdded=favoriteSongs.find(function(song){

      return song.title===currentSong.title;

   });

   if(!alreadyAdded)
   {
      favoriteSongs.push(currentSong);

      const favSong=document.createElement("div");

      favSong.classList.add("favorite-song");

      favSong.innerText=currentSong.title+" 🎶";

      favoriteList.appendChild(favSong);
   }

   updateFavoriteIcon();

});

 
//seek song
progress.addEventListener("input",function(){
   audio.currentTime=(progress.value*audio.duration)/100;
});

//auto play song
audio.addEventListener("ended",nextSong);

//initiallly set one song
loadSong(songIndex);

    
      
       
     
