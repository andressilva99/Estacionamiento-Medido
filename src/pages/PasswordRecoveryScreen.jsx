import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import {
    Button,
    HStack,
    NativeBaseProvider,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import { ImageBackground } from "react-native";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import AlertError from "../components/Alerts/AlertError";
import AlertNotice from "../components/Alerts/AlertNotice";
import InputControlledCopyPaste from "../components/InputControlledCopyPaste";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

const REGEX_EMAIL =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

const PasswordRecoveryScreen = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setIsOpenAlertNotice(!isOpenAlertNotice);
        navigation.goBack();
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const passwordRecovery = async (data) => {
        setLoading(true);

        const { email } = data;

        await constants.AXIOS_INST.get(`usuario/recuperarUsuarioClave/${email}`)
            .then((response) => {
                setMessageAlertNotice(response.data.mensaje);
                setIsOpenAlertNotice(true);
            })
            .catch((error) => {
                setMessageAlertError("Email no registrado");
                setIsOpenAlertError(true);
            });

        setLoading(false);
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <VStack space="lg" height={height} alignItems="center">
                    <HStack>
                        <Text style={styles.textHeader}>
                            Recuperar contraseña
                        </Text>
                    </HStack>
                    <HStack maxW={"85%"}>
                        <InputControlledCopyPaste
                            name="email"
                            control={control}
                            placeholder={"Correo registrado"}
                            rules={{
                                required: " Correo no ingresado",
                                pattern: {
                                        value: REGEX_EMAIL,
                                        message: " Correo electrónico inválido",
                                    },
                            }}
                        ></InputControlledCopyPaste>
                    </HStack>
                    {loading ? (
                        <Stack>
                            <Button
                                isLoading
                                style={styles.button}
                                isLoadingText={
                                    <Text style={styles.textButton}>
                                        Recuperando contraseña
                                    </Text>
                                }
                                spinnerPlacement="end"
                            ></Button>
                        </Stack>
                    ) : (
                        <Stack>
                            <Button
                                style={styles.button}
                                onPress={handleSubmit(passwordRecovery)}
                            >
                                <Text style={styles.textButton}>
                                    Recuperar contraseña
                                </Text>
                            </Button>
                        </Stack>
                    )}
                </VStack>
            </ImageBackground>
            <AlertError
                isOpen={isOpenAlertError}
                onClose={onCloseAlertError}
                message={messageAlertError}
                cancelRef={cancelRefAlertError}
            ></AlertError>
            <AlertNotice
                isOpen={isOpenAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
                cancelRef={cancelRefAlertNotice}
            ></AlertNotice>
        </NativeBaseProvider>
    );
};

export default PasswordRecoveryScreen;

const styles = ScaledSheet.create({
    textHeader: {
        fontSize: "30@ms",
        fontWeight: "bold",
        color: "#04467C",
        paddingTop: "50@ms",
    },
    button: {
        borderRadius: "30@ms",
        backgroundColor: "#04467C",
        minWidth: "85%",
    },
    textButton: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
});
