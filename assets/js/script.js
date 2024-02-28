const player = document.querySelector(".video-container");
const videoViewer = document.getElementById("viewer");
const progress = document.querySelector(".progress-bar");
const progressBarFilled = document.querySelector(".progress-bar-filled");
const pause = document.querySelector(".ph-pause");
const play = document.querySelector(".ph-play");
const unmute = document.querySelector(".ph-speaker-simple-high");
const mute = document.querySelector(".ph-speaker-simple-slash");
const controlButtons = document.querySelector(".play-pause-btns");
const audioButtons = document.querySelector(".audio-btns");
const volumeSlider = document.getElementById("volume");
const playbackRateSlider = document.getElementById("playbackRate");
const rewindIcon = document.getElementById("rewind");
const forwardIcon = document.getElementById("forward");
const resolutionIcon = document.getElementById("resolution");

function togglePlayPause() {
  toggle(play, pause);
  videoControl(videoViewer);
}

controlButtons.addEventListener("click", (e) => {
  const targetValue = e.target.classList;
  if (targetValue.contains("ph-pause") || targetValue.contains("ph-play"))
    togglePlayPause();
});

videoViewer.addEventListener("click", () => {
  togglePlayPause();
});

audioButtons.addEventListener("click", (e) => {
  const targetValue = e.target.classList;

  if (
    targetValue.contains("ph-speaker-simple-slash") ||
    targetValue.contains("ph-speaker-simple-high")
  ) {
    // Toggle mute/unmute icons
    videoViewer.volume = videoViewer.volume === 0 ? 0.5 : 0;

    // Update the volume slider value and background
    volumeSlider.value = videoViewer.volume;
    updateSliderBackground(volumeSlider);

    // Toggle mute/unmute icons based on the volume
    toggle(mute, unmute);
  }
});

videoViewer.addEventListener("timeupdate", () => {
  const percent = (videoViewer.currentTime / videoViewer.duration) * 100;
  progressBarFilled.style.width = `${percent}%`;
});

rewindIcon.addEventListener("click", () => {
  videoViewer.currentTime -= 5;
});

forwardIcon.addEventListener("click", () => {
  videoViewer.currentTime += 5;
});

volumeSlider.value = videoViewer.value;
updateSliderBackground(volumeSlider);
toggleMuteUnmuteIcons();

volumeSlider.addEventListener("input", () => {
  videoViewer.volume = volumeSlider.value;
  updateSliderBackground(volumeSlider);
  toggleMuteUnmuteIcons();
});

function toggleMuteUnmuteIcons() {
  if (videoViewer.volume === 0) {
    // If volume is 0, show mute icon
    mute.classList.remove("hidden");
    unmute.classList.add("hidden");
  } else {
    // If volume is greater than 0, show unmute icon
    unmute.classList.remove("hidden");
    mute.classList.add("hidden");
  }
}

playbackRateSlider.value = videoViewer.playbackRate;
updateSliderBackground(playbackRateSlider);

playbackRateSlider.addEventListener("input", () => {
  updateSliderBackground(playbackRateSlider);
  videoViewer.playbackRate = playbackRateSlider.value;
});

progress.addEventListener("click", (e) => {
  const progressBarRect = progress.getBoundingClientRect();
  const clickX = e.clientX - progressBarRect.left;
  const percentClicked = (clickX / progressBarRect.width) * 100;
  const targetTime = (percentClicked / 100) * videoViewer.duration;

  videoViewer.currentTime = targetTime;
});

// Event listener for resolution icon
resolutionIcon.addEventListener("click", () => {
  toggleFullscreen();
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // If not in fullscreen, go fullscreen
    if (videoViewer.requestFullscreen) {
      videoViewer.requestFullscreen();
    } else if (videoViewer.mozRequestFullScreen) {
      videoViewer.mozRequestFullScreen();
    } else if (videoViewer.webkitRequestFullscreen) {
      videoViewer.webkitRequestFullscreen();
    } else if (videoViewer.msRequestFullscreen) {
      videoViewer.msRequestFullscreen();
    }
  } else {
    // If in fullscreen, exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function updateSliderBackground(input) {
  const percent = (input.value / input.max) * 100;
  input.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percent}%, rgba(255, 253, 253, 0.55) ${percent}%, rgba(255, 253, 253, 0.55) 100%)`;
}

function toggle(element1, element2) {
  element1.classList.toggle("hidden");
  element2.classList.toggle("hidden");
}

function videoControl(viewer) {
  const method = viewer.paused ? "play" : "pause";
  viewer[method](); // video.play() or video.pause()
}

function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("iss-theme", theme);
}
