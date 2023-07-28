import {
    Dimensions,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { HStack, NativeBaseProvider, Stack, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import HeaderPage from "../components/HeaderPage";

const { height } = Dimensions.get("screen");

const InformationScreen = ({ navigation }) => {
    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    const handleWhatsAppPress = () => {
        const phoneNumber = '3564545134'
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        Linking.openURL(whatsappUrl);
    }

    const handleEmailPress = () => {
        const email = 'estacionamientosfco@gmail.com';
        const emailUrl = `mailto:${email}`;
        Linking.openURL(emailUrl);
      };

    return (
        <NativeBaseProvider>
            <Stack
                space="sm"
                height={height}
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack>
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <HStack justifyItems="flex-start" minW="85%">
                    <Ionicons
                        name="information-circle-outline"
                        style={styles.iconInformation}
                    />
                    <Text style={styles.textBold}>Acerca de</Text>
                </HStack>
                <VStack space="sm" width={"85%"}>
                    <Stack>
                        <Text style={styles.textBold}>Oficina Estacionamiento Medido San Francisco</Text>
                        <Text style={styles.textNormal}>9 de Julio 1880</Text>
                    </Stack>
                    <Stack>
                        <Text style={styles.textBold}>Teléfono</Text>
                        <TouchableOpacity onPress={handleWhatsAppPress}>
                            <Text style={styles.textLink}>3564-545134</Text>
                        </TouchableOpacity>
                    </Stack>
                    <Stack>
                        <Text style={styles.textBold}>Correo</Text>
                        <TouchableOpacity onPress={handleEmailPress}>
                            <Text style={styles.textLink}>
                                estacionamientosfco@gmail.com
                            </Text>
                        </TouchableOpacity>
                    </Stack>
                    <Stack>
                        <Text style={styles.textBold}>Horario de atención al público</Text>
                        <Text style={styles.textNormal}>Lunes a Viernes</Text>
                        <Text style={styles.textNormal}>
                            7:30 a 13:00 hs. - 14:00 a 19:30 hs.
                        </Text>
                        <Text style={styles.textNormal}>Sábado</Text>
                        <Text style={styles.textNormal}>8:30 a 12:30 hs.</Text>
                    </Stack>
                </VStack>
            </Stack>
        </NativeBaseProvider>
    );
};

export default InformationScreen;

const styles = ScaledSheet.create({
    background: {
        backgroundColor: "#f2f2f4",
    },
    iconInformation: {
        fontWeight: "bold",
        color: "#3f60af",
        fontSize: "25@ms",
        paddingRight: "10@ms",
    },
    textBold: {
        fontWeight: "bold",
        color: "#3f60af",
        fontSize: "20@ms",
    },
    textNormal: {
        color: "#3f60af",
        fontSize: "15@ms",
    },
    textLink: {
        color: "#3f60af",
        fontSize: "15@ms",
        textDecorationLine: "underline",
    },
});
