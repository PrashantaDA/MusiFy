// Initialized Variables

let songIndex = 0;
let audioElement = new Audio("assets/music/Cant Take My Eyes off You.mp3");
const masterPlay = document.querySelector("#masterPlay");
const progressBar = document.querySelector("#progressBar");
const gif = document.querySelector(".gif");
const songItems = Array.from(document.querySelector(".songitem"));

let songs = [
  {
    songName: "Can't Take My Eyes off You",
    filePath: "assets/music/Cant Take My Eyes off You.mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Chris Brown - Under The Influence",
    filePath: "assets/music/Chris Brown - Under The Influence (Audio).mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Coolio - Gangsta's Paradise ",
    filePath: "assets/music/Coolio - Gangsta's Paradise (Lyrics) ft. L.V..mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Eminem - Mockingbird ",
    filePath: "assets/music/Eminem - Mockingbird (Lyrics).mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Ghost - Mary On A Cross ",
    filePath: "assets/music/Ghost - Mary On A Cross (Official Audio).mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Sajjan Raj Vaidya - Dhairya ",
    filePath: "assets/music/Sajjan Raj Vaidya - Dhairya [Official Release].mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Sajjan Raj Vaidya - Parkhaai",
    filePath:
      "assets/music/Sajjan Raj Vaidya - Parkhaai [Official Release].mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Sasha Alex Sloan - Dancing With Your Ghost",
    filePath:
      "assets/music/Sasha Alex Sloan - Dancing With Your Ghost (Lyric Video).mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "The Chainsmokers - All We Know",
    filePath:
      "assets/music/The Chainsmokers - All We Know (Audio) ft. Phoebe Ryan.mp3",
    coverPath: "assets/img/cover1.jpg",
  },
  {
    songName: "Unholy - Sam Smith",
    filePath: "assets/music/Unholy.mp3",
    coverPath: "assets/img/cover1.jpg",
  },
];

// Getting song items

songItems.forEach((element, i) => {
  console.log(element, i);
  console.log("Hello");
  element.getElementsByTagName("img")[0].src = songs[i].filePath;
});

// Events
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  //? Update SeekBar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});
