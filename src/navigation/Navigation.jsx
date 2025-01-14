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
import { findTickets } from "../functions/findTickets";
import prueba from "../pages/prueba";
import messaging from "@react-native-firebase/messaging";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [logged, setLogged] = useState(false);
    const [currentData, setCurrentData] = useState(false);

    useEffect(() => {
        loadUser();
        logUser();
        notificationConfiguration();
        initialApp();
    }, []);

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log("Authorization status:", authStatus);
        }
    };

    const notificationConfiguration = () => {
        try {
            if (requestUserPermission()) {
                messaging()
                    .getToken()
                    .then((tok) => {
                        console.log(tok);
                        loggedUser.user.tokenNotification = tok;
                    });
            } else {
                console.log("Failed token status", authStatus);
            }

            // Check whether an initial notification is available
            messaging()
                .getInitialNotification()
                .then(async (remoteMessage) => {
                    if (remoteMessage) {
                        console.log(
                            "Notification caused app to open from quit state:",
                            remoteMessage.notification
                        );
                    }
                });

            // Assume a message-notification contains a "type" property in the data payload of the screen to open
            messaging().onNotificationOpenedApp(async (remoteMessage) => {
                console.log(
                    "Notification caused app to open from background state:",
                    remoteMessage.notification
                );
            });
            // Register background handler
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log(
                    "Message handled in the background!",
                    remoteMessage
                );
            });

            const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                Alert.alert(
                    "A new FCM message arrived!",
                    JSON.stringify(remoteMessage)
                );
            });

            return unsubscribe;
        } catch (error) {
            console.error(error.message);
        }
    };

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
            loggedUser.user.enableParking = true;
        } catch (e) {
            console.log(e);
        } finally {
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
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
                                <Stack.Screen
                                    name="prueba"
                                    component={prueba}
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
