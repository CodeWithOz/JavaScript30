// get video element
const video = document.querySelector('.player__video');

// play/pause when button is pressed/clicked
const playBtn = document.querySelector('.toggle');
playBtn.addEventListener(
  'click',
  () => {
    if (video.paused) {
      // start playing
      video.play();
      // change play icon to pause
      playBtn.innerHTML = '&#10074;&#10074;';
    } else {
      // start playing
      video.pause();
      // change play icon to pause
      playBtn.innerHTML = '►';
    }
  }
);
