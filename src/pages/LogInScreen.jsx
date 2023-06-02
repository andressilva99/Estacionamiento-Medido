import { ImageBackground, Text, Alert, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    HStack,
    Image,
    NativeBaseProvider,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import { ScaledSheet } from "react-native-size-matters";
import InputControlled from "../components/InputControlled";
import { useForm } from "react-hook-form";
import constants from "../constants/constants";
import { LinearGradient } from "expo-linear-gradient";
import loggedUser from "../objects/user";
import AlertError from "../components/Alerts/AlertError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserInformation } from "../functions/saveUserInformation";

const { height } = Dimensions.get("screen");

const LogInScreen = ({ navigation, route }) => {
    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const { setLogged } = route.params;

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const cancelRef = useRef(null);
    const onClose = () => setIsOpen(!isOpen);

    const LogIn = async (data) => {
        const { user, password } = data;
        if (loading) {
            return;
        }

        setLoading(true);

        const logIn = {
            usuario: {
                email: user,
                claveIngresada: password,
            },
        };

        await constants.AXIOS_INST.post("usuario/logIn", logIn)
            .then((response) => {
                const data = response.data.mensaje;
                FillUserData(data);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.mensaje);
                setIsOpen(true);
            });
        const logged = true
        AsyncStorage.setItem('loggedUser', JSON.stringify(logged))
        setLoading(false);

    };

    const Register = () => {
        navigation.navigate("Register1");
    };

    const FillUserData = (data) => {
        const token = data.token;
        const userData = data.usuario;

        console.log(userData.usuario_vehiculo)

        loggedUser.user.idUser = userData.idUsuario;
        loggedUser.user.documentNumber = userData.numeroDocumento;
        loggedUser.user.email = userData.email;
        loggedUser.user.firstName = userData.nombrePersona;
        loggedUser.user.lastName = userData.apellido;
        loggedUser.user.numberPhone = userData.numeroTelefono;
        loggedUser.user.phoneCompany.name = userData.compania_telefono;
        loggedUser.user.razonSocial = userData.razonSocial;
        loggedUser.user.typeDocument.name = userData.tipo_documento.nombre;
        loggedUser.user.userName = userData.nombreUsuario;
        loggedUser.user.token = token;
        loggedUser.user.balance = userData.saldo;
        if (userData.usuario_vehiculo != undefined) {
            userData.usuario_vehiculo.forEach((vehicle) => {
                loggedUser.user.vehicles.push({
                    mark: vehicle.vehiculo.marca.nombre,
                    model: vehicle.vehiculo.modelo.nombre,
                    patent: vehicle.vehiculo.patente,
                    color: vehicle.vehiculo.color.nombre,
                    idVehicle: vehicle.vehiculo.idVehiculo,
                    parked: false,
                });
            });
        }
        saveUserInformation();
        setLogged(true);
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <VStack
                    style={styles.backgroundContainer}
                    space="sm"
                    height={height}
                    alignItems="center"
                    safeAreaTop={true}
                    justifyContent="center"
                >
                    <Image
                        source={require("../image/logIn-icon-start.png")}
                        alt="logIn-icon-start"
                        size="20%"
                        resizeMode="center"
                    ></Image>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={[
                            "rgba(23,64,144,1)",
                            "rgba(99,170,48,1)",
                            "rgba(242,176,4,1)",
                            "rgba(222,26,62,1)",
                        ]}
                        style={styles.gradientContainer}
                    >
                        <HStack style={styles.inputContainer}>
                            <Stack flex={1}>
                                <Text style={styles.text}>Usuario</Text>
                            </Stack>
                            <HStack flex={2}>
                                <InputControlled
                                    name="user"
                                    control={control}
                                    style={styles.input}
                                    variant="unstiled"
                                ></InputControlled>
                            </HStack>
                        </HStack>
                    </LinearGradient>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={[
                            "rgba(23,64,144,1)",
                            "rgba(99,170,48,1)",
                            "rgba(242,176,4,1)",
                            "rgba(222,26,62,1)",
                        ]}
                        style={styles.gradientContainer}
                    >
                        <HStack style={styles.inputContainer}>
                            <Stack flex={1}>
                                <Text style={styles.text}>Contraseña</Text>
                            </Stack>
                            <HStack flex={2}>
                                <InputControlled
                                    name="password"
                                    control={control}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    variant="unstiled"
                                ></InputControlled>
                            </HStack>
                        </HStack>
                    </LinearGradient>
                    <Button variant="link">¿Olvidó su contraseña?</Button>
                    {loading ? (
                        <Button
                            isLoading
                            style={styles.button}
                            isLoadingText={
                                <Text style={styles.textButton}>
                                    Ingresando
                                </Text>
                            }
                            spinnerPlacement="end"
                        ></Button>
                    ) : (
                        <Button
                            onPress={handleSubmit(LogIn)}
                            style={styles.button}
                        >
                            <Text style={styles.textButton}>Ingresar</Text>
                        </Button>
                    )}

                    <Text>¿No tienes cuenta?</Text>
                    <Button onPress={Register} style={styles.button}>
                        <Text style={styles.textButton}>Registrarse</Text>
                    </Button>
                    <Image
                        source={constants.LOGO}
                        alt="logo-app"
                        resizeMode="contain"
                        style={styles.imageLogo}
                    ></Image>
                </VStack>
            </ImageBackground>
            <AlertError
                isOpen={isOpen}
                cancelRef={cancelRef}
                onClose={onClose}
                message={errorMessage}
            ></AlertError>
        </NativeBaseProvider>
    );
};

export default LogInScreen;

const styles = ScaledSheet.create({
    iconLogIn: {
        fontSize: "40@ms",
        color: "white",
    },
    inputContainer: {
        margin: "2%",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        minWidth: "85%",
        maxWidth: "85%",
    },
    gradientContainer: {
        borderRadius: "30@ms",
    },
    input: {
        fontSize: "17@ms",
    },
    text: {
        fontSize: "17@ms",
        color: "#565656",
    },
    button: {
        borderRadius: "30@ms",
        backgroundColor: "#04467C",
        minWidth: "50%",
    },
    textButton: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
    imageLogo: {
        width: "200@ms",
        height: "80@ms",
        marginBottom: "40@ms",
        marginTop: "40@ms",
    },
});
