import { StatusBar } from "expo-status-bar";
import MenuScreen from "./src/pages/MenuScreen";
import ChangePasswordScreen from "./src/pages/ChangePasswordScreen";
import ParkingScreen from "./src/pages/ParkingScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import RegisterStep1Screen from "./src/pages/RegisterStep1Screen";
import RegisterStep2Screen from "./src/pages/RegisterStep2Screen";
import Navigation from "./src/navigation/Navigation";

export default function App() {
    return (
        // <ChangePasswordScreen></ChangePasswordScreen>
        // <MenuScreen></MenuScreen>
        // <ParkingScreen></ParkingScreen>
        // <ProfileScreen></ProfileScreen>
        // <RegisterStep1Screen></RegisterStep1Screen>
        // <RegisterStep2Screen></RegisterStep2Screen>
        <Navigation></Navigation>
    );
}
