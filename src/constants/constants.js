import axios from "axios";
import backgroundInit from "../image/fondo-app.png";

// const PATH_INST = "https://sem1.onrender.com/api/";
const PATH_INST = "https://estacionamiento.sanfrancisco.gov.ar/api/";
// const PATH_INST = "https://estacionamientotest.sanfrancisco.gov.ar/api/";
const AXIOS_INST = axios.create({ baseURL: PATH_INST });
const BACKGROUND_INIT = backgroundInit;
const CLOSE_ICON = require("../image/Icon/Close-Icon.png");
const CREDIT_CARD_ICON = require("../image/Icon/Credit-card-Icon.png");
const HISTORY_ICON = require("../image/Icon/History-Icon.png");
const INFORMATION_ICON = require("../image/Icon/Information-Icon.png");
const MAP_ICON = require("../image/Icon/Map-Icon.png");
const MENU_ICON = require("../image/Icon/Menu-Icon.png");
const NOTICE_ICON = require("../image/Icon/Notice-Icon.png");
const PARKING_ICON = require("../image/Icon/Parking-Icon.png");
const PROFILE_ICON = require("../image/Icon/Profile-Icon.png");
const LOGO = require("../image/logo-app.png");
const CAR_SPLASH = require("../image/car-splash.png");
const ARROW = require("../image/arrow.png");
const DELETE_PATENT_ICON = require("../image/Icon/Delete-Patent-Icon.png");
const PARKING_HISTORY_ICON = require("../image/Icon/Parking-History-Icon.png");
const RECHARGES_ICON = require("../image/Icon/Recharges-Icon.png");
const MOVEMENTS_ICON = require("../image/Icon/Movements-Icon.png");
const DELETE_ACOUNT_ICON = require("../image/Icon/Delete-Acount-Icon.png");
const TIME_OUT = 40000;
// const LINK_DELETE_ACOUNT =
//     "https://estacionamientotest.sanfrancisco.gov.ar/api/usuario/eliminar";
const LINK_DELETE_ACOUNT =
    "https://estacionamiento.sanfrancisco.gov.ar/api/usuario/eliminar";
const PREVIOUS_DAYS = 15;
const PROGRAMMED_EXIT_FIRST_OPTION = 30;
const PROGRAMMED_EXIT_SECOND_OPTION = 60;
const PROGRAMMED_EXIT_THIRD_OPTION = 120;

export default {
    AXIOS_INST,
    BACKGROUND_INIT,
    CLOSE_ICON,
    CREDIT_CARD_ICON,
    HISTORY_ICON,
    INFORMATION_ICON,
    MAP_ICON,
    MENU_ICON,
    NOTICE_ICON,
    PARKING_ICON,
    PROFILE_ICON,
    LOGO,
    CAR_SPLASH,
    ARROW,
    DELETE_PATENT_ICON,
    PARKING_HISTORY_ICON,
    RECHARGES_ICON,
    MOVEMENTS_ICON,
    TIME_OUT,
    LINK_DELETE_ACOUNT,
    DELETE_ACOUNT_ICON,
    PREVIOUS_DAYS,
    PROGRAMMED_EXIT_FIRST_OPTION,
    PROGRAMMED_EXIT_SECOND_OPTION,
    PROGRAMMED_EXIT_THIRD_OPTION,
};
