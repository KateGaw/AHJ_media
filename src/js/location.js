import checkValidation from "./validator";
import moment from "moment";

const inputText = document.getElementById("text_enter");
const messageBlock = document.getElementById("message_block");
const coordsMessage = document.getElementById("write_coords");
const inputCoords = document.getElementById("coords_input");

let output;

const getLocation = (mess) => {
    output = mess;
    navigator.geolocation.getCurrentPosition(
        function(position) {
            setMessage(position.coords.latitude, position.coords.longitude, output);

        },
        function(error) {
            setCoords();
            console.log(`Error ${error.code} ${error.message}`);
        }
    );
};

const setCoords = () => {
    coordsMessage.classList.remove("hidden");
    coordsMessage.addEventListener("click", (event) => {
        if (event.target.id === "btn_submit") {
            if (inputCoords.value) {
                const value = checkValidation(inputCoords.value);

                if (!value) {
                    document.getElementById("err_mess").style.visibility = "visible";
                    inputCoords.addEventListener("click", () => {
                        document.getElementById("err_mess").style.visibility = "collapse";
                    });
                } else {
                    document.getElementById("err_mess").style.visibility = "collapse";

                    const loc = inputCoords.value.split(",");

                    console.log(loc[0].replace(/[^-.\d]/g, ""));
                    console.log(loc[1].replace(/[^-.\d]/g, ""));

                    setMessage(loc[0].replace(/[^-.\d]/g, ""), loc[1].replace(/[^-.\d]/g, ""), output);
                    inputCoords.value = "";
                    coordsMessage.classList.add("hidden");
                }
            }
        } else if (event.target.id === "btn_cancel") {
            inputCoords.value = "";
            coordsMessage.classList.add("hidden");
        }
    });
};

const setMessage = (lat, long, message) => {
    const mess = document.createElement("div");
    mess.classList.add("mess");
    mess.innerHTML = `
    <p class='date_p'>${moment(new Date()).format("DD.MM.YYYY HH:mm")}</p>
    <p class='mess_p'>${message}</p>
    <p class='loc_p'>[${lat}, ${long}]</p>`;

    messageBlock.prepend(mess);
    inputText.value = "";
};

export default getLocation;