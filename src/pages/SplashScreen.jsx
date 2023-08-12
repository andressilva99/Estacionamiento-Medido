import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import {
    Image,
    NativeBaseProvider,
    Spacer,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";

const { height } = Dimensions.get("screen");

const SplashScreen = () => {
    return (
        <NativeBaseProvider>
            <StatusBar
                barStyle={"default"}
                backgroundColor={"black"}
            ></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <VStack
                    height={height}
                    alignItems={"center"}
                    safeAreaTop={true}
                >
                    <Spacer></Spacer>
                    <Stack>
                        <Image
                            source={constants.LOGO}
                            alt="logo"
                            resizeMode="contain"
                            style={styles.logo}
                        ></Image>
                    </Stack>
                    <Spacer></Spacer>
                    <Stack alignItems={"center"}>
                        <Image
                            source={constants.CAR_SPLASH}
                            alt="logo"
                            resizeMode="contain"
                            style={styles.car}
                        ></Image>
                        <Image
                            source={constants.ARROW}
                            alt="arrow"
                            resizeMode="contain"
                            style={styles.arrow}
                        ></Image>
                    </Stack>
                    <Spacer></Spacer>
                </VStack>
            </ImageBackground>
        </NativeBaseProvider>
    );
};

export default SplashScreen;

const styles = ScaledSheet.create({
    logo: {
        height: "200@ms",
        width: "320@ms",
    },
    car: {
        height: "180@ms",
    },
    arrow: {
        height: "60@ms",
        width: "60@ms",
    },
});
