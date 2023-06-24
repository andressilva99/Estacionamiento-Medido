import {
    Dimensions,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
    Button,
    Image,
    NativeBaseProvider,
    Spacer,
    Stack,
    VStack,
} from "native-base";
import constants from "../constants/constants";
import loggedUser from "../objects/user";
import { saveUserInformation } from "../functions/saveUserInformation";
import { useRef } from "react";
import AlertError from "../components/Alerts/AlertError";
import { deleteUserData } from "../functions/deleteUserData";
import AlertNoticeFunction from "../components/Alerts/AlertNoticeFunction"

const { height } = Dimensions.get("screen");

const WelcomeScreen = ({navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const { setCurrentData, setLogged } = route.params;

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const cancelRef = useRef(null);
    const onClose = () => setIsOpen(!isOpen);

    const updateUserData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        
        const logIn = {
            usuario: {
                email: loggedUser.user.email,
                claveIngresada: loggedUser.user.password,
            },
        };

        await constants.AXIOS_INST.post("usuario/logIn", logIn)
            .then((response) => {
                const data = response.data.mensaje;
                FillUserData(data);
                navigation.navigate("Parking")
            })
            .catch((error) => {
                setErrorMessage(error.response.data.mensaje);
                setIsOpen(true);
            });
        setLoading(false);
    };

    const FillUserData = (data) => {
        const token = data.token;

        loggedUser.user.token = token;
        saveUserInformation();
        setCurrentData(true);
    };

    const logOut = () =>{
        deleteUserData();
        setLogged(false);
    }

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <VStack
                    space="sm"
                    height={height}
                    safeAreaTop={true}
                    alignItems="center"
                >
                    <Stack alignItems="center" flex={0.5}>
                        <Spacer></Spacer>
                        <Text style={styles.text}>Bienvenido</Text>
                        <Text style={styles.text}>{loggedUser.user.lastName}, {loggedUser.user.firstName}</Text>
                        <Spacer></Spacer>
                    </Stack>
                    <Stack flex={0.4}>
                        {loading ? (
                            <Button
                                isLoading
                                style={styles.buttonLogIn}
                                isLoadingText={
                                    <Text style={styles.buttonText}>
                                        Ingresando
                                    </Text>
                                }
                                spinnerPlacement="end"
                            ></Button>
                        ) : (
                            <Button
                                onPress={() => {
                                    updateUserData();
                                }}
                                style={styles.buttonLogIn}
                            >
                                <Text style={styles.buttonText}>Ingresar</Text>
                            </Button>
                        )}
                    </Stack>
                    <Stack flex={0.4} justifyContent="flex-end">
                        <Button style={styles.buttonLogOut} onPress={() => setIsOpenAlertNoticeFunction(true)}>
                            <Text style={styles.buttonText}>
                                Cambiar cuenta
                            </Text>
                        </Button>
                    </Stack>
                    <Stack flex={0.7} style={styles.containerImage}>
                        <Image
                            source={constants.LOGO}
                            alt="logo"
                            resizeMode="contain"
                            style={styles.image}
                        ></Image>
                    </Stack>
                </VStack>
            </ImageBackground>
            <AlertError
                isOpen={isOpen}
                cancelRef={cancelRef}
                onClose={onClose}
                message={errorMessage}
            ></AlertError>
            <AlertNoticeFunction
            isOpen={isOpenAlertNoticeFunction}
            cancelRef={cancelRefAlertNoticeFunction}
            onClose={onCloseAlertNoticeFunction}
            message={"¿Está seguro que desea Cambiar de Usuario?"}
            onPressAccept={logOut}></AlertNoticeFunction>
        </NativeBaseProvider>
    );
};

export default WelcomeScreen;

const styles = ScaledSheet.create({
    text: {
        fontSize: "35@ms",
        fontWeight: "bold",
        color: "#04467C",
    },
    buttonLogIn: {
        borderRadius: "30@ms",
        backgroundColor: "#04467C",
        minWidth: "50%",
        height: "45@ms",
    },
    buttonLogOut: {
        borderRadius: "30@ms",
        backgroundColor: "#8c0606",
        minWidth: "50%",
        height: "45@ms",
    },
    buttonText: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
    image: {
        marginTop: "40@ms",
        height: "120@ms",
    },
});
