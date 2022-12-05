// Initialized Variables

let songIndex = 0;

const masterPlay = document.querySelector("#masterPlay");
const progressBar = document.querySelector("#progressBar");
const gif = document.querySelector(".gif");
const songItems = Array.from(document.querySelectorAll(".songitem"));
const currentlyPlayingTitle = document.querySelector(".currentlyplayingtitle");

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
    filePath: "assets/music/Coolio - Gangsta's Paradise (Lyrics) ft. L.V..m4a",
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
    songName: "Sasha - Dancing With Your Ghost",
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

let audioElement = new Audio(
  "assets/music/Ghost - Mary On A Cross (Official Audio).mp3"
);

// Add songs
const songList = document.querySelector(".songitemcontainer");
songs.forEach((song) => {
  songList.innerHTML += `
     <div class="songitem">
     <img src=${song.coverPath} alt="Cover">
     <h3>${song.songName}</h3>
     <span class="songlistplay" >
     <h3 class="timestamp">
     04:05
     <i class="far fa-circle-play songitemplay"></i>
     </h3>
     </span>
  </div>
    `;
});

// Getting song items

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("h3")[0].innerText = songs[i].songName;
});

// Events
const playFn = (main) => {
  main.classList.remove("fa-play-circle");
  main.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

const pauseFn = (main) => {
  main.classList.remove("fa-pause-circle");
  main.classList.add("fa-play-circle");
  gif.style.opacity = 0;
};

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playFn(masterPlay);
  } else {
    audioElement.pause();
    pauseFn(masterPlay);
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

const makePlays = () => {
  Array.from(document.querySelectorAll(".songitemplay")).forEach((element) => {
    pauseFn(element);
  });
};

Array.from(document.querySelectorAll(".songitemplay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makePlays();
    playFn(e.target);
    audioElement.currentTime = 0;
    audioElement.play();
    playFn(masterPlay);
    masterPlay.addEventListener("click", () => {
      if (audioElement.paused) {
        pauseFn(e.target);
      } else {
        playFn(e.target);
      }
    });
  });
});
