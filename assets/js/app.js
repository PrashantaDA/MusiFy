// Initialized Variables

const masterPlay = document.querySelector("#masterPlay");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const progressBar = document.querySelector("#progressBar");
const gif = document.querySelector(".gif");
const songItems = Array.from(document.querySelectorAll(".songitem"));
const currentlyPlayingTitle = document.querySelector(".currentlyplayingtitle");
const goTop = document.querySelector(".uparrow");

let songs = [
  {
    id: 1,
    songName: "Can't Take My Eyes off You",
    filePath: "assets/music/Cant Take My Eyes off You.mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "03:41",
  },
  {
    id: 2,
    songName: "Chris Brown - Under The Influence",
    filePath: "assets/music/Chris Brown - Under The Influence (Audio).mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "03:06",
  },
  {
    id: 3,
    songName: "Coolio - Gangsta's Paradise ",
    filePath: "assets/music/Coolio - Gangsta's Paradise (Lyrics) ft. L.V..m4a",
    coverPath: "assets/img/cover1.jpg",
    duration: "04:00",
  },
  {
    id: 4,
    songName: "Eminem - Mockingbird ",
    filePath: "assets/music/Eminem - Mockingbird (Lyrics).mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "04:10",
  },
  {
    id: 5,
    songName: "Ghost - Mary On A Cross ",
    filePath: "assets/music/Ghost - Mary On A Cross (Official Audio).mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "04:04",
  },
  {
    id: 6,
    songName: "Sajjan Raj Vaidya - Dhairya ",
    filePath: "assets/music/Sajjan Raj Vaidya - Dhairya [Official Release].mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "06:34",
  },
  {
    id: 7,
    songName: "Sajjan Raj Vaidya - Parkhaai",
    filePath:
      "assets/music/Sajjan Raj Vaidya - Parkhaai [Official Release].mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "04:23",
  },
  {
    id: 8,
    songName: "Sasha - Dancing With Your Ghost",
    filePath:
      "assets/music/Sasha Alex Sloan - Dancing With Your Ghost (Lyric Video).mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "03:19",
  },
  {
    id: 9,
    songName: "The Chainsmokers - All We Know",
    filePath:
      "assets/music/The Chainsmokers - All We Know (Audio) ft. Phoebe Ryan.mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "03:15",
  },
  {
    id: 10,
    songName: "Unholy - Sam Smith",
    filePath: "assets/music/Unholy.mp3",
    coverPath: "assets/img/cover1.jpg",
    duration: "02:35",
  },
];

let audioElement = new Audio("");

// Add songs
const songList = document.querySelector(".songitemcontainer");
songs.forEach((song, i) => {
  songList.innerHTML += `
     <div class="songitem">
     <img src=${song.coverPath} alt="Cover">
     <h3 class="songname">${song.songName}</h3>
     <span class="songlistplay" >
     <h3 class="timestamp">
     ${song.duration}
     <i class="far fa-circle-play songitemplay" id=${i}></i>
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

const pausePlay = (player) => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playFn(player);
  } else {
    audioElement.pause();
    pauseFn(player);
  }
};

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

audioElement.addEventListener("ended", () => {
  pausePlay(masterPlay);
});

const makePlays = () => {
  Array.from(document.querySelectorAll(".songitemplay")).forEach((element) => {
    pauseFn(element);
  });
};

audioElement.src = `${songs[0].filePath}`;
masterPlay.addEventListener("click", () => {
  currentlyPlayingTitle.innerHTML = `${songs[0].songName}`;
  audioElement.currentTime = 0;
  pausePlay(masterPlay);
});

Array.from(document.querySelectorAll(".songitemplay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makePlays();

    audioElement.src = `${songs[e.target.id].filePath}`;
    currentlyPlayingTitle.innerHTML = `${songs[e.target.id].songName}`;
    audioElement.currentTime = 0;

    pausePlay(e.target);
    pausePlay(masterPlay);

    /*                                                                                                                  */

    //* Previous and Next Buttons

    //? Previous

    previous.addEventListener("click", () => {
      if (e.target.id <= 1) {
        e.target.id = 9;
      } else {
        e.target.id -= 1;
      }
      makePlays();

      audioElement.src = `${songs[e.target.id].filePath}`;
      currentlyPlayingTitle.innerHTML = `${songs[e.target.id].songName}`;

      audioElement.currentTime = 0;
      pausePlay(masterPlay);
      pausePlay(e.target);
    });

    //? Next

    next.addEventListener("click", () => {
      if (e.target.id >= 0 && e.target.id < 9) {
        e.target.id++;
      } else {
        e.target.id = 0;
      }

      audioElement.src = `${songs[e.target.id].filePath}`;
      currentlyPlayingTitle.innerHTML = `${songs[e.target.id].songName}`;

      audioElement.currentTime = 0;

      pausePlay(masterPlay);
    });
  });
});

// Go to top
goTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
