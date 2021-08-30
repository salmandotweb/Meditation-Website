AOS.init({
  offset: 150,
  duration: 1000,
});

// navbar

const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > nav.offsetHeight + 100) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

// slider

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let idx = 0;
let interval = setInterval(run, 3000);

function run() {
  idx++;
  changeSlide();
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 3000);
}

function changeSlide() {
  if (idx > slides.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = slides.length - 1;
  }
  slider.style.transform = `translateX(${-idx * 100}%)`;
}

prevBtn.addEventListener("click", () => {
  idx--;
  resetInterval();
  changeSlide();
});

nextBtn.addEventListener("click", () => {
  idx++;
  resetInterval();
  changeSlide();
});

// music player

const playBtn = document.querySelector(".playBtn");
const audio = document.querySelector("#song");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const song = ["meditate"];

let songsIndex = 0;
loadSongs(song[songsIndex]);

function loadSongs(song) {
  audio.src = `audios/${song}.mp3`;
}

function playSong(playBtn) {
  playBtn.classList.add("active");
  if (playBtn.classList.contains("fas")) {
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");
  }
  audio.play();
}

function pauseSong(playBtn) {
  playBtn.classList.remove("active");
  if (playBtn.classList.contains("fas")) {
    playBtn.classList.remove("fa-pause-circle");
    playBtn.classList.add("fa-play-circle");
  }
  audio.pause();
}


function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
}

function musicEnd() {
  playBtn.classList.remove("active");
  playBtn.classList.remove("fa-pause-circle");
  playBtn.classList.add("fa-play-circle");
}
playBtn.addEventListener("click", () => {
  const isPlaying = playBtn.classList.contains("active");

  if (isPlaying) {
    pauseSong(playBtn);
  } else {
    playSong(playBtn);
  }
});

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", musicEnd);
progressBar.addEventListener("click", setProgress);
