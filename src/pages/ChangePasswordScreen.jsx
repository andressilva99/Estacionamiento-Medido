import { Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import loggedUser from "../objects/user";
import constants from "../constants/constants";
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("screen");

const ChangePasswordScreen = () => {
    const { control, handleSubmit, watch } = useForm();

    const [hidePassword1, setHidePassword1] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);
    const [hidePassword3, setHidePassword3] = useState(true);

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
    };

    const changePassword = async (data) => {
        const { newPassword, oldPassword } = data;

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
        ).then((response) => {
            const message = response.data.mensaje;
            alert(message);
        }).catch((error) => alert(error));
    };

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
                <HStack maxW="90%">
                    <HeaderPage dissableButtonMenu={true}></HeaderPage>
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
                    <InputControlled
                        name="newPassword"
                        placeholder="Nueva Clave"
                        control={control}
                        width="85%"
                        secureTextEntry={hidePassword1}
                        // rules={}
                    ></InputControlled>
                    <TouchableOpacity style={styles.touchVisiblePassword}>
                        <Ionicons name={hidePassword1 ? "eye" : "eye-off"} style={styles.icon} color="#3f60af" onPress={() => setHidePassword1(!hidePassword1)} />
                    </TouchableOpacity>
                </HStack>
                <HStack maxW="85%">
                    <InputControlled
                        name="repeatNewPassword"
                        placeholder="Repetir Nueva Clave"
                        control={control}
                        width="85%"
                        secureTextEntry={hidePassword2}
                        // rules={}
                    ></InputControlled>
                    <TouchableOpacity style={styles.touchVisiblePassword}>
                        <Ionicons name={hidePassword2 ? "eye" : "eye-off"} style={styles.icon} color="#3f60af" onPress={() => setHidePassword2(!hidePassword2)} />
                    </TouchableOpacity>
                </HStack>
                <HStack maxW="85%">
                    <InputControlled
                        name="oldPassword"
                        placeholder="Clave Actual"
                        control={control}
                        width="85%"
                        secureTextEntry={hidePassword3}
                        // rules={}
                    ></InputControlled>
                    <TouchableOpacity style={styles.touchVisiblePassword}>
                        <Ionicons name={hidePassword3 ? "eye" : "eye-off"} style={styles.icon} color="#3f60af" onPress={() => setHidePassword3(!hidePassword3)} />
                    </TouchableOpacity>
                </HStack>
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
                        Confirmar Nueva Clave
                    </Text>
                </Button>
            </Stack>
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
