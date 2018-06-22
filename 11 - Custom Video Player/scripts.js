// get video element
const video = document.querySelector('.player__video');

// play/pause when button is pressed/clicked
const playBtn = document.querySelector('.toggle');
playBtn.addEventListener(
  'click',
  () => video.paused ? video.play() : video.pause()
);
