import axios from "axios";
import backgroundInit from "../image/fondo-app.png";

const PATH_INST = "https://sem-v2rs.onrender.com/api/";
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
};
