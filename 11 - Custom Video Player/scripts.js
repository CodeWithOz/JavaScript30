// get video element
const video = document.querySelector('.player__video');

// play/pause when button is clicked
const playBtn = document.querySelector('.toggle');
playBtn.addEventListener('click', handlePlayPause);

const handlePlayPause = event => {
  if (video.paused) {
    video.play();
    // change play icon to pause
    playBtn.innerHTML = '&#10074;&#10074;';
  } else {
    video.pause();
    // change pause icon to play
    playBtn.innerHTML = '►';
  }
};
