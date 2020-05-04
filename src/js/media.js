import getLocation from "./location";
import { timerBegin, timerFinish } from "./timer";

const messages = document.getElementById("messages");
const audioSave = document.getElementById("audio_save");
const audioCancel = document.getElementById("audio_cancel");
const audioWritting = document.getElementById("audio_writting");
const icons = document.getElementById("icons");
let recordBool;

const videoWindow = document.createElement("video");

const messageMediaError = document.getElementById("message_media_error");
const errMedia = document.getElementById("err_media");
const closeButton = document.getElementById("btn_ok");

const checkAccess = () => {
    if (!navigator.mediaDevices) {
        console.log("no available");
        messageMediaError.classList.remove("hidden");
        errMedia.innerText =
            "К сожалению, этот браузер не поддерживает функцию записи аудио или видео.";
        closeButton.addEventListener("click", () => {
            messageMediaError.classList.add("hidden");
        });
        return;
    } else {
        messageMediaError.classList.add("hidden");
    }
};

const toggle = () => {
    icons.classList.toggle("hidden");
    audioWritting.classList.toggle("hidden");
};

const videoShowing = (stream) => {
    videoWindow.controls = true;
    videoWindow.muted = "muted";
    videoWindow.className = "video_window";
    messages.appendChild(videoWindow);
    videoWindow.srcObject = stream;
    videoWindow.play();
};

const audioRec = async() => {
    checkAccess();
    try {
        messageMediaError.classList.add("hidden");
        const audio = document.createElement("audio");
        audio.setAttribute("controls", null);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.addEventListener("start", () => {
            console.log("audio start");
            toggle();
            timerBegin();
        });
        recorder.addEventListener("dataavailable", (event) => {
            console.log("data available");
            chunks.push(event.data);
        });
        recorder.addEventListener("stop", () => {
            console.log("audio stop");
            timerFinish();
            toggle();
            if (recordBool) {
                const audio = document.createElement("audio");
                const blob = new Blob(chunks, { type: "audio/mp3" });

                const file = new FileReader();
                file.readAsDataURL(blob);

                file.onload = () => {
                    audio.src = file.result;
                    audio.controls = true;
                    getLocation(audio.outerHTML);
                };
            }
        });

        recorder.start();
        audioSave.addEventListener("click", () => {
            console.log("audio saving");
            recordBool = true;
            recorder.stop();
        });

        audioCancel.addEventListener("click", () => {
            console.log("audio cancel");
            recordBool = false;
            recorder.stop();
        });
    } catch (e) {
        console.error(e);
        messageMediaError.classList.remove("hidden");
        errMedia.innerText =
            "Ошибка! Убедитесь, что вы дали разрешение браузеру на запись аудио/видео.";
        closeButton.addEventListener("click", () => {
            messageMediaError.classList.add("hidden");
        });
    }
};

const videoRec = async() => {
    checkAccess();
    try {
        messageMediaError.classList.add("hidden");
        const video = document.createElement("video");
        video.setAttribute("controls", null);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        recorder.addEventListener("start", () => {
            console.log("video start");
            toggle();
            timerBegin();
            videoShowing(stream);
        });
        recorder.addEventListener("dataavailable", (event) => {
            console.log("data available");
            chunks.push(event.data);
        });
        recorder.addEventListener("stop", () => {
            console.log("video stop");
            toggle();
            timerFinish();
            videoWindow.parentNode.removeChild(videoWindow);
            if (recordBool) {
                const element = document.createElement("video");
                const blob = new Blob(chunks, { type: "video/mp4" });
                const file = new FileReader();
                file.readAsDataURL(blob);
                file.onload = () => {
                    element.src = file.result;
                    element.controls = true;
                    getLocation(element.outerHTML);
                };
            }
        });
        recorder.start();
        audioSave.addEventListener("click", () => {
            console.log("video save");
            recordBool = true;
            recorder.stop();
        });

        audioCancel.addEventListener("click", () => {
            console.log("video cancel");
            recordBool = false;
            recorder.stop();
        });
    } catch (e) {
        console.error(e);
        messageMediaError.classList.remove("hidden");
        errMedia.innerText =
            "Ошибка! Убедитесь, что вы дали разрешение браузеру на запись аудио/видео.";
        closeButton.addEventListener("click", () => {
            messageMediaError.classList.add("hidden");
        });
    }
};

export { audioRec, videoRec };