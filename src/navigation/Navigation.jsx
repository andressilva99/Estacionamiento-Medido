import React, { useState } from "react";
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

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [user, setUser] = useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
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
                            initialParams={{setUser}}
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
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="LogInS"
                            component={LogInScreen}
                            initialParams={{ setUser }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Register1"
                            component={RegisterStep1Screen}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Register2"
                            component={RegisterStep2Screen}
                        ></Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
