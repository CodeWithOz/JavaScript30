// get video element
const video = document.querySelector('.player__video');

// play/pause when button is clicked
const playBtn = document.querySelector('.toggle');
playBtn.addEventListener('click', handlePlayPause);

function handlePlayPause(event) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

// play/pause video when video area is clicked
video.addEventListener('click', handlePlayPause);

// change play/pause icon when video is played/paused
// this ensures that the icon changes no matter what pauses/plays the video
video.addEventListener('play', () => playBtn.innerHTML = '&#10074;&#10074;');
video.addEventListener('pause', () => playBtn.innerHTML = '►');

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
let draggingRate = false;
playbackRateSlider.addEventListener('mousedown', () => draggingRate = true);
playbackRateSlider.addEventListener('mouseup', () => draggingRate = false);
playbackRateSlider.addEventListener('mousemove', event => {
  // abort if mouse is not down
  if (!draggingRate) return;

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
let draggingVolume = false;
volumeSlider.addEventListener('mousedown', () => draggingVolume = true);
volumeSlider.addEventListener('mouseup', () => draggingVolume = false);
volumeSlider.addEventListener('mousemove', event => {
  // abort if mouse is not down
  if (!draggingVolume) return;

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

let duration;

// initialize seeker after video has loaded
video.addEventListener('durationchange', handleSeekerProgress);

function handleSeekerProgress(event) {
  const { currentTime } = event.target;
  duration = event.target.duration;
  const timeFraction = currentTime / duration;
  currentSeekerPos.style.flexBasis = `${timeFraction * fullSeekerWidth.offsetWidth}px`;
}

// connect seeker to elapsed time
video.addEventListener('timeupdate', handleSeekerProgress);

// change time with seeker position
// essentially, connect seeker position to click and drag
let draggingSeeker = false;
fullSeekerWidth.addEventListener('mousedown', () => draggingSeeker = true);
fullSeekerWidth.addEventListener('mouseup', () => draggingSeeker = false);
fullSeekerWidth.addEventListener('mousemove', event => {
  // abort if mouse is not down
  if (!draggingSeeker) return;

  // get the current horizontal position of the mouse
  const { offsetX } = event;

  // assign that value to the seeker
  currentSeekerPos.style.flexBasis = `${offsetX}px`;

  // set currentTime based on the new seeker position
  const seekFraction = offsetX / fullSeekerWidth.offsetWidth;
  video.currentTime = seekFraction * duration;
});
