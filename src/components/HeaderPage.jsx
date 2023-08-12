import { BackHandler, Text } from "react-native";
import React from "react";
import {
    Button,
    HStack,
    Image,
    NativeBaseProvider,
    Spacer,
    Stack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";

const HeaderPage = ({
    onPress,
    dissableButtonMenu,
    navigation,
    exitApp,
    dissableButtonGoBack,
}) => {
    const goBack = () => {
        navigation.goBack();
    };

    const exitApplication = () => {
        BackHandler.exitApp();
    };

    return (
        <NativeBaseProvider>
            <HStack style={styles.containerHeader}>
                {dissableButtonGoBack ? (
                    <Stack flex={0.3}></Stack>
                ) : (
                    <Button
                        variant={"ghost"}
                        onPress={() => {
                            exitApp ? exitApplication() : goBack();
                        }}
                        flex={0.3}
                    >
                        <AntDesign name="arrowleft" style={styles.iconBack} />
                    </Button>
                )}
                <Image
                    source={constants.PARKING_ICON}
                    alt={"Parking"}
                    style={styles.icon}
                    resizeMode="contain"
                    flex={0.4}
                ></Image>
                <Stack flex={1}>
                    <Text style={styles.textHeader}>E. Medido</Text>
                </Stack>
                {dissableButtonMenu ? (
                    <Stack flex={0.4}></Stack>
                ) : (
                    <Button variant="ghost" onPress={onPress} flex={0.4}>
                        <Feather name="menu" style={styles.iconMenu} />
                    </Button>
                )}
            </HStack>
        </NativeBaseProvider>
    );
};

export default HeaderPage;

const styles = ScaledSheet.create({
    containerHeader: {
        height: "60@ms",
        borderRadius: "5@ms",
        paddingLeft: "10@ms",
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    textHeader: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
        paddingLeft: "15@ms",
    },
    icon: {
        width: "35@ms",
        height: "35@ms",
        borderRadius: "100@ms",
    },
    iconMenu: {
        color: "white",
        fontSize: "37@ms",
    },
    iconBack: {
        color: "white",
        fontSize: "32@ms",
    },
});
