import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../pages/ProfileScreen";
import RegisterStep1Screen from "../pages/RegisterStep1Screen";
import RegisterStep2Screen from "../pages/RegisterStep2Screen";
import LogInScreen from "../pages/LogInScreen";
import ParkingScreen from "../pages/ParkingScreen";
import MenuScreen from "../pages/MenuScreen";
import InformationScreen from "../pages/InformationScreen";
import EnterVehicleScreen from "../pages/EnterVehicleScreen";
import ParkingHistoryScreen from "../pages/History/ParkingHistoryScreen";
import RechargesHistoryScreen from "../pages/History/RechargesHistoryScreen";
import MovementsHistoryScreen from "../pages/History/MovementsHistoryScreen";
import AnnouncementsHistoryScreen from "../pages/History/AnnouncementsHistoryScreen";
import DeletePatentScreen from "../pages/DeletePatentScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loggedUser from "../objects/user";
import ChangePasswordScreen from "../pages/ChangePasswordScreen";
import SplashScreen from "../pages/SplashScreen";
import WelcomeScreen from "../pages/WelcomeScreen";
import AnnouncementsScreen from "../pages/AnnouncementsScreen";
import PasswordRecoveryScreen from "../pages/PasswordRecoveryScreen";
import VehiclePropertyScreen from "../pages/VehiclePropertyScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [logged, setLogged] = useState(false);
    const [currentData, setCurrentData] = useState(false);

    useEffect(() => {
        loadUser();
        logUser();
        initialApp();
    }, []);

    const logUser = async () => {
        await AsyncStorage.getItem("loggedUser")
            .then((value) => {
                if (value === "true") {
                    setLogged(true);
                }
            })
            .catch((error) => console.error(error));
    };

    const loadUser = async () => {
        try {
            const userString = await AsyncStorage.getItem("user");
            const user = JSON.parse(userString);
            loggedUser.user = user.user;
        } catch (error) {
            console.log("Error loading user:", error);
        }
    };

    const initialApp = async () => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setAppIsReady(true);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {appIsReady ? (
                    logged ? (
                        currentData ? (
                            <>
                                <Stack.Screen
                                    name="Parking"
                                    component={ParkingScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="Profile"
                                    component={ProfileScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="Menu"
                                    component={MenuScreen}
                                    initialParams={{ setLogged }}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="Information"
                                    component={InformationScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="EnterVehicle"
                                    component={EnterVehicleScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="ParkingHistory"
                                    component={ParkingHistoryScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="RechargesHistory"
                                    component={RechargesHistoryScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="MovementsHistory"
                                    component={MovementsHistoryScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="AnnouncementsHistory"
                                    component={AnnouncementsHistoryScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="DeletePatent"
                                    component={DeletePatentScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="ChangePassword"
                                    component={ChangePasswordScreen}
                                    initialParams={{ setLogged }}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="Announcements"
                                    component={AnnouncementsScreen}
                                ></Stack.Screen>
                                <Stack.Screen
                                    name="VehicleProperty"
                                    component={VehiclePropertyScreen}
                                ></Stack.Screen>
                            </>
                        ) : (
                            <Stack.Screen
                                name="Welcome"
                                component={WelcomeScreen}
                                initialParams={{ setCurrentData, setLogged }}
                            ></Stack.Screen>
                        )
                    ) : (
                        <>
                            <Stack.Screen
                                name="LogInS"
                                component={LogInScreen}
                                initialParams={{ setLogged, setCurrentData }}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="Register1"
                                component={RegisterStep1Screen}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="Register2"
                                component={RegisterStep2Screen}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="PasswordRecovery"
                                component={PasswordRecoveryScreen}
                            ></Stack.Screen>
                        </>
                    )
                ) : (
                    <Stack.Screen
                        name="Splash"
                        component={SplashScreen}
                    ></Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
