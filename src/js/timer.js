/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */

const audioTimer = document.getElementById('audio_timer');
let stop = true;

const timer = () => {
  if (!stop) {
    audioTimer.started = new Date();
    audioTimer.update = (ms) => audioTimer.innerHTML = new Date(ms).toISOString().split(/T|\./)[1];
    setInterval(() => audioTimer.update(new Date() - audioTimer.started), 500);
  }
};

const timerBegin = () => {
  stop = false;
  timer();
};

const timerFinish = () => {
  stop = true;
  audioTimer.innerText = '00:00:00';
};

export { timerBegin, timerFinish };
