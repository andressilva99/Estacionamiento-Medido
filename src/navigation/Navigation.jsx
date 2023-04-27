import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../pages/ProfileScreen";
import RegisterStep1Screen from "../pages/RegisterStep1Screen";
import RegisterStep2Screen from "../pages/RegisterStep2Screen";
import LogInScreen from "../pages/LogInScreen";
import ParkingScreen from "../pages/ParkingScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [user, setUser] = useState(undefined);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="LogInS"
                            component={LogInScreen}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Register1"
                            component={RegisterStep1Screen}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Register2"
                            component={RegisterStep2Screen}
                        ></Stack.Screen>
                        <Stack.Screen name="Parking" component={ParkingScreen}>
                        </Stack.Screen>
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                        ></Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
