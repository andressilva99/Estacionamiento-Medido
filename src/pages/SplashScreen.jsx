import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import { Image, NativeBaseProvider, Spacer, Stack, StatusBar } from "native-base";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";

const { height } = Dimensions.get("screen");

const SplashScreen = () => {
    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <View
                    height={height}
                >
                    <Stack flex={2} paddingX={"10%"}>
                        <Image
                            source={constants.LOGO}
                            alt="logo"
                            resizeMode="center"
                            flex={1}
                        ></Image>
                    </Stack>
                    <Stack flex={1} paddingX={"30%"} paddingBottom={"15%"} alignItems={"center"}>
                        <Image
                            source={constants.CAR_SPLASH}
                            alt="logo"
                            resizeMode="center"
                            flex={1}
                        ></Image>
                        <Image
                        source={constants.ARROW}
                        alt="arrow"
                        resizeMode="center"
                        flex={1}
                        ></Image>
                    </Stack>
                </View>
            </ImageBackground>
        </NativeBaseProvider>
    );
};

export default SplashScreen;

const styles = ScaledSheet.create({
    logo: {},
});
