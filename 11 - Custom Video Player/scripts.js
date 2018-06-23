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
let rateDragging = false;
playbackRateSlider.addEventListener('mousedown', () => rateDragging = true);
playbackRateSlider.addEventListener('mouseup', () => rateDragging = false);
playbackRateSlider.addEventListener('mousemove', event => {
  // abort if mouse is not down
  if (!rateDragging) return;

  // change the value
  handleRateChange(event);
});

// adjust volume with its slider
const volumeSlider = document.querySelector('[name="volume"]');
volumeSlider.addEventListener('change', handleVolumeChange);

function handleVolumeChange(event) {
  // get the current value of the slider
  const { value } = event.target;
  // assign that value to the video element
  video.volume = value;
}

// change volume with click and drag
let volumeDragging = false;
volumeSlider.addEventListener('mousedown', () => volumeDragging = true);
volumeSlider.addEventListener('mouseup', () => volumeDragging = false);
volumeSlider.addEventListener('mousemove', event => {
  // abort if mouse is not down
  if (!volumeDragging) return;

  // change the value
  handleVolumeChange(event);
});

// skip forward or backward
const skipBtns = [...document.querySelectorAll('[data-skip]')];
skipBtns.forEach(btn => {
  btn.addEventListener('click', event => {
    video.currentTime += Number(btn.dataset.skip);
  });
});

const fullSeekerWidth = document.querySelector('.progress');
const currentSeekerPos = document.querySelector('.progress__filled');

// initialize seeker after video has loaded
video.addEventListener('durationchange', handleSeekerProgress);

function handleSeekerProgress(event) {
  const { currentTime, duration } = event.target;
  const timeFraction = currentTime / duration;
  currentSeekerPos.style.flexBasis = `${timeFraction * fullSeekerWidth.offsetWidth}px`;
}

// connect seeker to elapsed time
video.addEventListener('timeupdate', handleSeekerProgress);
