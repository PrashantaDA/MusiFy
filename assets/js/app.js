// Initialized Variables
const masterPlay = document.querySelector("#masterPlay");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const progressBar = document.querySelector("#progressBar");
const volumeBar = document.querySelector("#volumeBar");
const gif = document.querySelector(".gif");
const currentlyPlayingTitle = document.querySelector(".currently-playing-title");
const bannerTitle = document.querySelector(".banner-title");
const bannerArtist = document.querySelector(".banner-artist");
const bannerCover = document.querySelector(".banner-cover");
const currentTimeDisplay = document.querySelector(".current-time");
const durationDisplay = document.querySelector(".duration");
const goTop = document.querySelector(".uparrow");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const themeToggle = document.querySelector("#theme-toggle");
const playlistToggle = document.querySelector(".playlist-toggle");
const songList = document.querySelector(".song-list");

let audioElement = new Audio();
let currentSongIndex = 0;
let isShuffling = false;
let isRepeating = false;
let isPlaying = false;

const songs = [
	{
		id: 1,
		songName: "50 Cent - Baby By Me ft. Ne-Yo",
		artist: "50 Cent, Ne-Yo",
		filePath: "assets/music/50 Cent - Baby By Me ft. Ne-Yo.mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "03:55",
	},
	{
		id: 2,
		songName: "Chris Brown - Under The Influence",
		artist: "Chris Brown",
		filePath: "assets/music/Chris Brown - Under The Influence (Audio).mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "03:06",
	},
	{
		id: 3,
		songName: "Chris Brown - No Guidance ft. Drake",
		artist: "Chris Brown, Drake",
		filePath: "assets/music/Chris Brown - No Guidance (Audio) ft. Drake.mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "04:22",
	},
	{
		id: 4,
		songName: "Juan and Kyle - Marikit sa Dilim feat. JAWZ",
		artist: "Juan and Kyle, JAWZ",
		filePath: "assets/music/Juan and Kyle - Marikit sa Dilim feat. JAWZ .mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "04:32",
	},
	{
		id: 5,
		songName: "Ghost - Mary On A Cross",
		artist: "Ghost",
		filePath: "assets/music/Ghost - Mary On A Cross (Official Audio).mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "04:04",
	},
	{
		id: 6,
		songName: "Lil Tjay - Calling My Phone (feat. 6LACK)",
		artist: "Lil Tjay, 6LACK",
		filePath: "assets/music/Lil Tjay - Calling My Phone (feat. 6LACK).mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "03:21",
	},
	{
		id: 7,
		songName: "NMIXX(엔믹스) Papillon",
		artist: "NMIXX",
		filePath: "assets/music/NMIXX(엔믹스) Papillon.mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "02:38",
	},
	{
		id: 8,
		songName: "Sean Paul - She Doesn't Mind",
		artist: "Sean Paul",
		filePath: "assets/music/Sean Paul - She Doesn't Mind.mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "04:05",
	},
	{
		id: 9,
		songName: "攬佬SKAI ISYOUGOD八方來財因果",
		artist: "SKAI ISYOUGOD",
		filePath: "assets/music/攬佬SKAI ISYOUGOD八方來財因果.mp3",
		coverPath: "assets/img/cover1.jpg",
		duration: "03:51",
	},
];

// Add songs to the list
const songItemContainer = document.querySelector(".song-item-container");
songs.forEach((song, i) => {
	songItemContainer.innerHTML += `
    <div class="song-item" data-index="${i}">
      <img src="${song.coverPath}" alt="${song.songName} Cover">
      <h3 class="songname">${song.songName}</h3>
      <span class="songlistplay">
        <h3 class="timestamp">${song.duration}</h3>
        <i class="far fa-circle-play song-item-play" id="${i}" aria-label="Play ${song.songName}"></i>
      </span>
    </div>
  `;
});

// Helper Functions
const playFn = (element) => {
	if (element === masterPlay) {
		element.classList.remove("fa-circle-play");
		element.classList.add("fa-circle-pause");
	} else {
		element.classList.remove("fa-circle-play");
		element.classList.add("fa-circle-pause");
	}
	gif.style.opacity = 1;
	document.querySelector(`.song-item[data-index="${currentSongIndex}"]`).classList.add("active");
	isPlaying = true;
};

const pauseFn = (element) => {
	if (element === masterPlay) {
		element.classList.remove("fa-circle-pause");
		element.classList.add("fa-circle-play");
	} else {
		element.classList.remove("fa-circle-pause");
		element.classList.add("fa-circle-play");
	}
	gif.style.opacity = 0;
	document.querySelector(`.song-item[data-index="${currentSongIndex}"]`).classList.remove("active");
	isPlaying = false;
};

const pausePlay = (player) => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement
			.play()
			.then(() => {
				playFn(player);
				// Update master play button if it's not the player being clicked
				if (player !== masterPlay) {
					playFn(masterPlay);
				}
				// Update all song item play buttons
				document.querySelectorAll(".song-item-play").forEach((icon, index) => {
					if (index === currentSongIndex) {
						icon.classList.remove("fa-circle-play");
						icon.classList.add("fa-circle-pause");
					} else {
						icon.classList.remove("fa-circle-pause");
						icon.classList.add("fa-circle-play");
					}
				});
			})
			.catch((error) => {
				console.error("Error playing audio:", error);
			});
	} else {
		audioElement.pause();
		pauseFn(player);
		// Update master play button if it's not the player being clicked
		if (player !== masterPlay) {
			pauseFn(masterPlay);
		}
		// Update all song item play buttons
		document.querySelectorAll(".song-item-play").forEach((icon) => {
			icon.classList.remove("fa-circle-pause");
			icon.classList.add("fa-circle-play");
		});
	}
};

const updateSongInfo = (index) => {
	audioElement.src = songs[index].filePath;
	currentlyPlayingTitle.innerHTML = songs[index].songName;
	bannerTitle.innerHTML = songs[index].songName;
	bannerArtist.innerHTML = songs[index].artist;
	bannerCover.src = songs[index].coverPath;

	// Update active state
	document.querySelectorAll(".song-item").forEach((item) => item.classList.remove("active"));
	document.querySelector(`.song-item[data-index="${index}"]`).classList.add("active");

	// Update play/pause icons
	document.querySelectorAll(".song-item-play").forEach((icon, i) => {
		if (i === index && isPlaying) {
			icon.classList.remove("fa-circle-play");
			icon.classList.add("fa-circle-pause");
		} else {
			icon.classList.remove("fa-circle-pause");
			icon.classList.add("fa-circle-play");
		}
	});

	// Update master play button
	if (isPlaying) {
		masterPlay.classList.remove("fa-circle-play");
		masterPlay.classList.add("fa-circle-pause");
	} else {
		masterPlay.classList.remove("fa-circle-pause");
		masterPlay.classList.add("fa-circle-play");
	}
};

const formatTime = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

// Event Listeners
audioElement.addEventListener("timeupdate", () => {
	const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
	progressBar.value = progress;
	currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
	durationDisplay.textContent = formatTime(audioElement.duration || 0);
});

progressBar.addEventListener("input", () => {
	audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

volumeBar.addEventListener("input", () => {
	audioElement.volume = volumeBar.value / 100;
});

audioElement.addEventListener("ended", () => {
	if (isRepeating) {
		audioElement.currentTime = 0;
		audioElement.play().catch((error) => {
			console.error("Error playing audio:", error);
		});
	} else if (isShuffling) {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * songs.length);
		} while (newIndex === currentSongIndex && songs.length > 1);
		currentSongIndex = newIndex;
		updateSongInfo(currentSongIndex);
		audioElement.play().catch((error) => {
			console.error("Error playing audio:", error);
		});
	} else {
		next.click();
	}
});

const makePlays = () => {
	document.querySelectorAll(".song-item-play").forEach((icon) => {
		icon.classList.remove("fa-circle-pause");
		icon.classList.add("fa-circle-play");
	});
};

masterPlay.addEventListener("click", () => {
	if (audioElement.src === "") {
		updateSongInfo(currentSongIndex);
	}
	pausePlay(masterPlay);
});

document.querySelectorAll(".song-item-play").forEach((element) => {
	element.addEventListener("click", (e) => {
		const clickedIndex = parseInt(e.target.id);
		if (clickedIndex !== currentSongIndex) {
			makePlays();
			currentSongIndex = clickedIndex;
			updateSongInfo(currentSongIndex);
		}
		pausePlay(e.target);
		// Don't call pausePlay on masterPlay here as it will be handled in the pausePlay function
	});
});

// Add audio event listeners to handle state changes
audioElement.addEventListener("play", () => {
	playFn(masterPlay);
	const currentSongPlay = document.querySelector(`.song-item-play[id="${currentSongIndex}"]`);
	if (currentSongPlay) {
		playFn(currentSongPlay);
	}
});

audioElement.addEventListener("pause", () => {
	pauseFn(masterPlay);
	const currentSongPlay = document.querySelector(`.song-item-play[id="${currentSongIndex}"]`);
	if (currentSongPlay) {
		pauseFn(currentSongPlay);
	}
});

previous.addEventListener("click", () => {
	let newIndex;
	if (isShuffling) {
		do {
			newIndex = Math.floor(Math.random() * songs.length);
		} while (newIndex === currentSongIndex && songs.length > 1);
	} else {
		newIndex = currentSongIndex <= 0 ? songs.length - 1 : currentSongIndex - 1;
	}
	currentSongIndex = newIndex;
	updateSongInfo(currentSongIndex);
	if (isPlaying) {
		audioElement.play().catch((error) => {
			console.error("Error playing audio:", error);
		});
	}
});

next.addEventListener("click", () => {
	let newIndex;
	if (isShuffling) {
		do {
			newIndex = Math.floor(Math.random() * songs.length);
		} while (newIndex === currentSongIndex && songs.length > 1);
	} else {
		newIndex = currentSongIndex >= songs.length - 1 ? 0 : currentSongIndex + 1;
	}
	currentSongIndex = newIndex;
	updateSongInfo(currentSongIndex);
	if (isPlaying) {
		audioElement.play().catch((error) => {
			console.error("Error playing audio:", error);
		});
	}
});

shuffleBtn.addEventListener("click", () => {
	isShuffling = !isShuffling;
	shuffleBtn.style.color = isShuffling ? "var(--neon-purple)" : "#fff";
	shuffleBtn.classList.toggle("active");
});

repeatBtn.addEventListener("click", () => {
	isRepeating = !isRepeating;
	repeatBtn.style.color = isRepeating ? "var(--neon-purple)" : "#fff";
	repeatBtn.classList.toggle("active");
});

playlistToggle.addEventListener("click", () => {
	songList.classList.toggle("active");
});

goTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

themeToggle.addEventListener("click", () => {
	document.body.classList.toggle("light");
	themeToggle.innerHTML = document.body.classList.contains("light") ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-adjust"></i>';
});

// Initialize
updateSongInfo(currentSongIndex);
