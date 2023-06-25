import { Text } from "react-native";
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

const HeaderPage = ({ onPress, dissableButtonMenu }) => {
    return (
        <NativeBaseProvider>
            <HStack style={styles.containerHeader}>
                <Image
                    source={constants.PARKING_ICON}
                    alt={"Parking"}
                    style={styles.icon}
                    resizeMode="contain"
                    flex={0.4}
                ></Image>
                {/* <Spacer></Spacer> */}
                <Stack>
                    <Text style={styles.textHeader}>
                        Estacionamiento medido
                    </Text>
                </Stack>
                {/* <Spacer></Spacer> */}
                {dissableButtonMenu ? null : (
                    <Button variant="ghost" onPress={onPress} flex={1}>
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
        paddingLeft: "15@ms"
    },
    icon: {
        width: "35@ms",
        height: "35@ms",
        borderRadius: "100@ms",
    },
    iconMenu: {
        color: "white",
        fontSize: "35@ms",
    },
});
