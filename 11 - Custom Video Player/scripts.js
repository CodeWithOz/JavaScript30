// get video element
const video = document.querySelector('.player__video');

// play/pause when button is clicked
const playBtn = document.querySelector('.toggle');
playBtn.addEventListener('click', handlePlayPause);

function handlePlayPause(event) {
  video[video.paused ? 'play' : 'pause']();
};

// play/pause video when video area is clicked
video.addEventListener('click', handlePlayPause);

// change play/pause icon when video is played/paused
// this ensures that the icon changes no matter what pauses/plays the video
video.addEventListener('play', () => playBtn.innerHTML = '&#10074;&#10074;');
video.addEventListener('pause', () => playBtn.innerHTML = '►');

// // get playback rate slider
// const playbackRateSlider = document.querySelector('[name="playbackRate"]');
// playbackRateSlider.addEventListener('change', handleRateChange);
//
// function handleRateChange(event) {
//   // get the current value of the slider
//   const { value } = event.target;
//   // assign that value to the video element
//   video.playbackRate = value;
// }
//
// // change plaback rate with click and drag
// let draggingRate = false;
// playbackRateSlider.addEventListener('mousedown', () => draggingRate = true);
// playbackRateSlider.addEventListener('mouseup', () => draggingRate = false);
// playbackRateSlider.addEventListener('mousemove', event => {
//   // abort if mouse is not down
//   if (!draggingRate) return;
//
//   // change the value
//   handleRateChange(event);
// });
//
// // adjust volume with its slider
// const volumeSlider = document.querySelector('[name="volume"]');
// volumeSlider.addEventListener('change', handleVolumeChange);
//
// function handleVolumeChange(event) {
//   // get the current value of the slider
//   const { value } = event.target;
//   // assign that value to the video element
//   video.volume = value;
// }
//
// // change volume with click and drag
// let draggingVolume = false;
// volumeSlider.addEventListener('mousedown', () => draggingVolume = true);
// volumeSlider.addEventListener('mouseup', () => draggingVolume = false);
// volumeSlider.addEventListener('mousemove', event => {
//   // abort if mouse is not down
//   if (!draggingVolume) return;
//
//   // change the value
//   handleVolumeChange(event);
// });

// combine volume and playbackRate slide handlers
const draggingObj = {
  volume: false,
  playbackRate: false
};

const ranges = document.querySelectorAll('.player__slider');
ranges.forEach(range => {
  range.addEventListener('mousedown', event => draggingObj[event.target.name] = true);
  range.addEventListener('mouseup', event => draggingObj[event.target.name] = false);
  range.addEventListener('change', handleSliderMove);
  range.addEventListener('mousemove', event => {
    // abort if mouse is not down
    if (!draggingObj[event.target.name]) return;

    // change the value
    handleSliderMove(event);
  });
});

function handleSliderMove(event) {
  // assign the current value of the slider to the video element
  video[event.target.name] = event.target.value;
}

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
  // const timeFraction = currentTime / duration;
  // currentSeekerPos.style.flexBasis = `${timeFraction * fullSeekerWidth.offsetWidth}px`;

  // use a fraction instead of pixel values to remain consistent
  // with the initial value in the stylesheet
  const timePercent = (currentTime / duration) * 100;
  currentSeekerPos.style.flexBasis = `${timePercent}%`;
}

// connect seeker to elapsed time
video.addEventListener('timeupdate', handleSeekerProgress);

// change time with seeker position
// essentially, connect seeker position to click and drag
let draggingSeeker = false;
fullSeekerWidth.addEventListener('mousedown', () => draggingSeeker = true);
fullSeekerWidth.addEventListener('mouseup', () => draggingSeeker = false);
// fullSeekerWidth.addEventListener('mousemove', event => {
//   // abort if mouse is not down
//   if (!draggingSeeker) return;
//
//   // update seeker position with mouse position
//   updateSeekerPosition(event);
// });

// use short-circuiting of logical operators to condense the above
// `mousemove` handler
fullSeekerWidth.addEventListener('mousemove', event => draggingSeeker && updateSeekerPosition(event));

function updateSeekerPosition(event) {
  // get the current horizontal position of the mouse
  const { offsetX } = event;

  // assign that value to the seeker
  currentSeekerPos.style.flexBasis = `${offsetX}px`;

  // set currentTime based on the new seeker position
  const seekFraction = offsetX / fullSeekerWidth.offsetWidth;
  video.currentTime = seekFraction * duration;
}

// update seeker when mouse is clicked on a spot
fullSeekerWidth.addEventListener('click', updateSeekerPosition);

// make video fullscreen
const fullscreenEnabled = document.fullscreenEnabled ||
	document.webkitFullscreenEnabled ||
	document.mozFullScreenEnabled ||
	document.msFullscreenEnabled;

const fullscreenBtn = document.querySelector('[name="fullscreen"]');
const playerDiv = document.querySelector('.player');
fullscreenBtn.addEventListener('click', event => {
  if (!fullscreenEnabled) alert('Fullscreen mode is not available on this browser');

  // check if document is fullscreen
  const fullscreen = getFullscreenStatus();

  if (fullscreen) {
    // exit fullscreen
    if (document.exitFullscreen) {
    	document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
    	document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
    	document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
    	document.msExitFullscreen();
    }
  } else {
    // go full-screen
    // playerDiv is used here to carry over the custom controls
    if (playerDiv.requestFullscreen) {
      playerDiv.requestFullscreen();
    } else if (playerDiv.webkitRequestFullscreen) {
      playerDiv.webkitRequestFullscreen();
    } else if (playerDiv.mozRequestFullScreen) {
      playerDiv.mozRequestFullScreen();
    } else if (playerDiv.msRequestFullscreen) {
      playerDiv.msRequestFullscreen();
    }
  }
});

function getFullscreenStatus() {
  return document.fullscreenElement ||
  	document.webkitFullscreenElement ||
  	document.mozFullScreenElement ||
  	document.msFullscreenElement;
}

// change icon when fullscreen status changes
document.addEventListener("fullscreenchange", FShandler);

function FShandler(event) {
  const fullscreen = getFullscreenStatus();
  fullscreenBtn.innerHTML = fullscreen ? '♦♦' : '♥♥';
}

document.addEventListener("webkitfullscreenchange", FShandler);
document.addEventListener("mozfullscreenchange", FShandler);
document.addEventListener("MSFullscreenChange", FShandler);
