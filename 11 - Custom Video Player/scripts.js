// get video element
const video = document.querySelector('.player__video');

// play/pause when button is clicked
const playBtn = document.querySelector('.toggle');
playBtn.addEventListener('click', handlePlayPause);

function handlePlayPause(event) {
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

// play/pause video when video area is clicked
video.addEventListener('click', handlePlayPause);

// get playback rate slider
const playbackRateSlider = document.querySelector('[name="playbackRate"]');
playbackRateSlider.addEventListener('change', handleRateChange);

function handleRateChange(event) {
  // get the current value of the slider
  const { value } = event.target;
  // assign that value to the video element
  video.playbackRate = value;
}

// change plaback rate with click and drag
let dragging = false;
playbackRateSlider.addEventListener('mousedown', () => dragging = true);
playbackRateSlider.addEventListener('mouseup', () => dragging = false);
playbackRateSlider.addEventListener('mousemove', event => {
  // abort if mouse is not down
  if (!dragging) return;

  // change the value
  handleRateChange(event);
});
