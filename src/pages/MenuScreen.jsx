import { Dimensions, ImageBackground, StatusBar } from "react-native";
import React, { useState } from "react";
import {
    HStack,
    NativeBaseProvider,
    Spacer,
    VStack,
    Image,
    ScrollView,
} from "native-base";
import PressableCustom from "../components/PressableCustom";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";

const { height } = Dimensions.get("screen");

const MenuScreen = ({ navigation }) => {
    const [subMenu, setSubMenu] = useState(false);

    const handleButtonPress = (id) => {
        console.log(`Pressed button ${id}`);
        navigation.navigate(id);
        setSubMenu(!subMenu);
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <ScrollView height={height}>
                    <VStack
                        // height={height}
                        style={styles.backgroundContainer}
                        space="sm"
                    >
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Menú"}
                                icon={constants.MENU_ICON}
                                styleTouchable={{ backgroundColor: "#009FE3" }}
                                iconRight={true}
                                styleText={styles.textMenu}
                                onPress={handleButtonPress}
                                id={"menu"}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Estacionamiento Medido"}
                                icon={constants.PARKING_ICON}
                                styleTouchable={{ backgroundColor: "#086EC1" }}
                                onPress={handleButtonPress}
                                id={"Parking"}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Perfil"}
                                icon={constants.PROFILE_ICON}
                                styleTouchable={{ backgroundColor: "#05509C" }}
                                onPress={handleButtonPress}
                                id={"Profile"}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Historial"}
                                icon={constants.HISTORY_ICON}
                                styleTouchable={{ backgroundColor: "#009FE3" }}
                                onPress={() => setSubMenu(!subMenu)}
                                id={"History"}
                            ></PressableCustom>
                        </HStack>
                        {subMenu ? (
                            <>
                                <HStack style={styles.containerPressable}>
                                    <PressableCustom
                                        text={"Estacionamientos"}
                                        icon={constants.PROFILE_ICON}
                                        styleTouchable={styles.touchableSubMenu}
                                        onPress={handleButtonPress}
                                        id={"Undefined"}
                                    ></PressableCustom>
                                </HStack>
                                <HStack style={styles.containerPressable}>
                                    <PressableCustom
                                        text={"Recargas"}
                                        icon={constants.PROFILE_ICON}
                                        styleTouchable={styles.touchableSubMenu}
                                        onPress={handleButtonPress}
                                        id={"Undefined"}
                                    ></PressableCustom>
                                </HStack>
                                <HStack style={styles.containerPressable}>
                                    <PressableCustom
                                        text={"Movimientos"}
                                        icon={constants.PROFILE_ICON}
                                        styleTouchable={styles.touchableSubMenu}
                                        onPress={handleButtonPress}
                                        id={"Undefined"}
                                    ></PressableCustom>
                                </HStack>
                                <HStack style={styles.containerPressable}>
                                    <PressableCustom
                                        text={"Avisos"}
                                        icon={constants.PROFILE_ICON}
                                        styleTouchable={styles.touchableSubMenu}
                                        onPress={handleButtonPress}
                                        id={"Undefined"}
                                    ></PressableCustom>
                                </HStack>
                            </>
                        ) : null}
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Pago en línea"}
                                icon={constants.CREDIT_CARD_ICON}
                                styleTouchable={{ backgroundColor: "#086EC1" }}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Avisos"}
                                icon={constants.NOTICE_ICON}
                                styleTouchable={{ backgroundColor: "#05509C" }}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Mapas"}
                                icon={constants.MAP_ICON}
                                styleTouchable={{ backgroundColor: "#009FE3" }}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"A cerca de"}
                                icon={constants.INFORMATION_ICON}
                                styleTouchable={{ backgroundColor: "#086EC1" }}
                            ></PressableCustom>
                        </HStack>
                        <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Cerrar sesión"}
                                icon={constants.CLOSE_ICON}
                                styleTouchable={{ backgroundColor: "#05509C" }}
                            ></PressableCustom>
                        </HStack>
                        <Spacer></Spacer>
                        <Image
                            source={constants.LOGO}
                            alt="logo-app"
                            // size="40%"
                            resizeMode="contain"
                            // maxH="15%"
                            style={styles.imageLogo}
                        ></Image>
                        <Spacer></Spacer>
                    </VStack>
                </ScrollView>
            </ImageBackground>
        </NativeBaseProvider>
    );
};

export default MenuScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        alignItems: "center",
        paddingTop: "4%",
        paddingBottom: "8%",
    },
    containerPressable: {
        minWidth: "100%",
    },
    buttonBorder: {
        borderWidth: 3,
        borderColor: "#f2f2f4",
        borderRadius: 0,
        justifyContent: "flex-start",
    },
    textButton: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 8,
    },
    textMenu: {
        fontWeight: "bold",
        fontSize: "24@ms",
    },
    touchableSubMenu: {
        backgroundColor: "#949599",
        paddingLeft: "50@ms",
    },
    imageLogo: {
        width: "200@ms",
        height: "80@ms",
        marginBottom: "40@ms",
        marginTop: "40@ms"
    }
});
