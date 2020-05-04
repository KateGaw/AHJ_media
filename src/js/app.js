import getLocation from './location';
import { audioRec, videoRec } from './media';

const inputText = document.getElementById("text_enter");
const audioClick = document.getElementById('audio');
const videoClick = document.getElementById('video');

inputText.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && inputText.value) {
        getLocation(inputText.value);
    }
});

audioClick.addEventListener('click', () => {
    console.log('start audio recording');
    audioRec();
});

videoClick.addEventListener('click', () => {
    console.log('start video recording');
    videoRec();
});