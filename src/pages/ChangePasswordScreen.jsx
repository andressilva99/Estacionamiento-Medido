import { Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import {
    Button,
    HStack,
    Input,
    NativeBaseProvider,
    Stack,
    StatusBar,
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import HeaderPage from "../components/HeaderPage";
import { ScaledSheet } from "react-native-size-matters";
import InputControlled from "../components/InputControlled";
import InputControlledCopyPaste from "../components/InputControlledCopyPaste";
import { useForm } from "react-hook-form";
import loggedUser from "../objects/user";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import AlertError from "../components/Alerts/AlertError";
import AlertNotice from "../components/Alerts/AlertNotice";
import { deleteUserData } from "../functions/deleteUserData";
import { useEffect } from "react";

const { height } = Dimensions.get("screen");

const ChangePasswordScreen = ({ navigation, route }) => {
    const { control, handleSubmit, watch } = useForm();

    const { setLogged } = route.params;

    const [hidePassword1, setHidePassword1] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);
    const [hidePassword3, setHidePassword3] = useState(true);

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setIsOpenAlertNotice(!isOpenAlertNotice);
        logOut();
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loggedUser.user.changePass) {
            setMessageAlertNotice(
                "Antes de continuar, debe cambiar la contraseña predeterminada por una contraseña que la pueda recordar"
            );
            setIsOpenAlertNotice(true);
            loggedUser.user.changePass = false;
        }
    }, []);

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
    };

    const changePassword = async (data) => {
        const { newPassword, oldPassword } = data;
        setLoading(true);

        const changePass = {
            usuario: {
                idUsuario: loggedUser.user.idUser,
                claveVieja: oldPassword,
                claveNueva: newPassword,
            },
        };

        await constants.AXIOS_INST.put(
            "usuario/modificarClave",
            changePass,
            config
        )
            .then((response) => {
                const message = response.data.mensaje;
                setMessageAlertNotice("Clave cambiada");
                setIsOpenAlertNotice(true);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    setMessageAlertError(error.response.data.mensaje);
                    setIsOpenAlertError(true);
                } else if (error.request) {
                    console.log(error.request);
                    setMessageAlertError(
                        "No se ha obtenido respuesta, intente nuevamente"
                    );
                    setIsOpenAlertError(true);
                } else {
                    console.log(error);
                }
                return;
            });

        setLoading(false);
    };

    const logOut = () => {
        deleteUserData();
        setLogged(false);
    };

    const passRepeat = watch("newPassword");

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height={height}
                alignItems="center"
                safeAreaTop={true}
            >
                <HStack>
                    <HeaderPage
                        dissableButtonMenu={true}
                        navigation={navigation}
                    ></HeaderPage>
                </HStack>
                <Stack
                    flexDirection="row"
                    style={styles.containerChangePassword}
                >
                    <SimpleLineIcons
                        name="lock"
                        style={styles.icon}
                        color="#3f60af"
                    />
                    <Text style={styles.textChangePassword}>Cambiar Clave</Text>
                </Stack>
                <HStack maxW="85%">
                    <InputControlledCopyPaste
                        name="oldPassword"
                        placeholder="Clave Actual"
                        control={control}
                        width="85%"
                        secureTextEntry={hidePassword3}
                        autoCapitalize="none"
                        // rules={}
                    ></InputControlledCopyPaste>
                    <TouchableOpacity style={styles.touchVisiblePassword}>
                        <Ionicons
                            name={hidePassword3 ? "eye" : "eye-off"}
                            style={styles.icon}
                            color="#3f60af"
                            onPress={() => setHidePassword3(!hidePassword3)}
                        />
                    </TouchableOpacity>
                </HStack>
                <HStack maxW="85%">
                    <InputControlledCopyPaste
                        name="newPassword"
                        placeholder="Nueva Clave"
                        control={control}
                        width="85%"
                        secureTextEntry={hidePassword1}
                        autoCapitalize={"none"}
                        // rules={}
                    ></InputControlledCopyPaste>
                    <TouchableOpacity style={styles.touchVisiblePassword}>
                        <Ionicons
                            name={hidePassword1 ? "eye" : "eye-off"}
                            style={styles.icon}
                            color="#3f60af"
                            onPress={() => setHidePassword1(!hidePassword1)}
                        />
                    </TouchableOpacity>
                </HStack>
                <HStack maxW="85%">
                    <InputControlledCopyPaste
                        name="repeatNewPassword"
                        placeholder="Repetir Nueva Clave"
                        control={control}
                        width="85%"
                        secureTextEntry={hidePassword2}
                        autoCapitalize={"none"}
                        rules={{
                            validate: (value) =>
                                value === passRepeat ||
                                " La contraseña ingresada no es la misma",
                        }}
                    ></InputControlledCopyPaste>
                    <TouchableOpacity style={styles.touchVisiblePassword}>
                        <Ionicons
                            name={hidePassword2 ? "eye" : "eye-off"}
                            style={styles.icon}
                            color="#3f60af"
                            onPress={() => setHidePassword2(!hidePassword2)}
                        />
                    </TouchableOpacity>
                </HStack>
                <Stack>
                    <Text>
                        *Nota: al cambiar la contraseña se cerrará sesión
                        automaticamente
                    </Text>
                </Stack>
                {loading ? (
                    <Button
                        isLoading
                        startIcon={
                            <SimpleLineIcons
                                name="lock"
                                style={styles.icon}
                                color="white"
                            />
                        }
                        style={styles.buttonConfirmPassword}
                        isLoadingText={
                            <Text style={styles.textConfirmPassword}>
                                Cambiando Clave
                            </Text>
                        }
                        spinnerPlacement="end"
                    ></Button>
                ) : (
                    <Button
                        startIcon={
                            <SimpleLineIcons
                                name="lock"
                                style={styles.icon}
                                color="white"
                            />
                        }
                        style={styles.buttonConfirmPassword}
                        onPress={handleSubmit(changePassword)}
                    >
                        <Text style={styles.textConfirmPassword}>
                            Cambiar Clave
                        </Text>
                    </Button>
                )}
            </Stack>
            <AlertNotice
                isOpen={isOpenAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
                cancelRef={cancelRefAlertNotice}
            ></AlertNotice>
            <AlertError
                isOpen={isOpenAlertError}
                onClose={onCloseAlertError}
                cancelRef={cancelRefAlertError}
                message={messageAlertError}
            ></AlertError>
        </NativeBaseProvider>
    );
};

export default ChangePasswordScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerChangePassword: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "10@ms",
    },
    textChangePassword: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "10@ms",
    },
    buttonConfirmPassword: {
        borderRadius: "30@ms",
        backgroundColor: "#00a54f",
        justifyContent: "flex-start",
        minHeight: "45@ms",
        minWidth: "85%",
    },
    textConfirmPassword: {
        color: "white",
        fontSize: "19@ms",
        fontWeight: "bold",
    },
    icon: {
        fontSize: "25@ms",
    },
    touchVisiblePassword: {
        flex: 0.15,
        alignItems: "center",
        justifyContent: "center",
    },
});
