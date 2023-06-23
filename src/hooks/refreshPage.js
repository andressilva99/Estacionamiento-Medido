import { useState } from "react";

const [refreshParkingScreeen, setRefreshParkingScreeen] = useState(false);

const refreshParkingScreen = (value) => {
    setRefreshParkingScreeen(value)
}

export {
    refreshParkingScreen,
}