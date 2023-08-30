import {
    ImageBackground,
    Text,
    Alert,
    Dimensions,
    Touchable,
    TouchableOpacity,
    TextInput,
    TouchableHighlight,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    HStack,
    Image,
    Input,
    NativeBaseProvider,
    Stack,
    StatusBar,
    VStack,
    View,
} from "native-base";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import constants from "../constants/constants";
import { LinearGradient } from "expo-linear-gradient";
import loggedUser from "../objects/user";
import AlertError from "../components/Alerts/AlertError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserInformation } from "../functions/saveUserInformation";
import { Ionicons } from "@expo/vector-icons";
import InputControlledCopyPaste from "../components/InputControlledCopyPaste";
import { findTickets } from "../functions/findTickets";
import HeaderButtonGoBack from "../components/HeaderButtonGoBack";

const { height } = Dimensions.get("screen");

const noToken = "No se generó un token"

const LogInScreen = ({ navigation, route }) => {
    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const { setLogged, setCurrentData } = route.params;

    const [viewToken, setViewToken] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const cancelRef = useRef(null);
    const onClose = () => setIsOpen(!isOpen);

    const [hidePassword, setHidePassword] = useState(true);

    const LogIn = async (data) => {
        const { user, password } = data;

        if (loading) {
            return;
        }

        setLoading(true);
        if (user != null && password != null) {
            const logIn = {
                usuario: {
                    email: user.trim(),
                    claveIngresada: password.trim(),
                    token: loggedUser.user.tokenNotification,
                },
            };

            await constants.AXIOS_INST.post("usuario/logIn", logIn)
                .then((response) => {
                    const data = response.data.mensaje;
                    loggedUser.user.password = password;
                    FillUserData(data);
                    const logged = true;
                    AsyncStorage.setItem("loggedUser", JSON.stringify(logged));
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        setErrorMessage(error.response.data.mensaje);
                        setIsOpen(true);
                    } else if (error.request) {
                        console.log(error.request);
                        setErrorMessage(
                            "No se ha obtenido respuesta, intente nuevamente"
                        );
                        setIsOpen(true);
                    } else {
                        console.log(error);
                    }
                    return;
                });
        } else {
            setErrorMessage("Correo y/o Contraseña no ingresados");
            setIsOpen(true);
        }

        setLoading(false);
    };

    const Register = () => {
        navigation.navigate("Register1");
    };

    const handlePasswordRecovery = () => {
        navigation.navigate("PasswordRecovery");
    };

    const FillUserData = async (data) => {
        const token = data.token;
        const userData = data.usuario;

        loggedUser.user.idUser = userData.idUsuario;
        loggedUser.user.changePass = userData.cambiarClave;
        loggedUser.user.documentNumber = userData.numeroDocumento;
        loggedUser.user.email = userData.email;
        loggedUser.user.firstName = userData.nombrePersona;
        loggedUser.user.lastName = userData.apellido;
        loggedUser.user.numberPhone = userData.numeroTelefono;
        loggedUser.user.razonSocial = userData.razonSocial;
        loggedUser.user.typeDocument.idTypeDocument =
            userData.tipo_documento.idTipoDocumento;
        loggedUser.user.typeDocument.name = userData.tipo_documento.nombre;
        loggedUser.user.token = token;
        loggedUser.user.phoneCompany.idPhoneCompany =
            userData.compania_telefono.idCompaniaTelefono;
        loggedUser.user.phoneCompany.name = userData.compania_telefono.nombre;
        loggedUser.user.balance = userData.saldo;
        if (userData.usuario_vehiculo != undefined) {
            userData.usuario_vehiculo.forEach((vehicle) => {
                loggedUser.user.vehicles.push({
                    mark: vehicle.vehiculo.marca.nombre,
                    model: vehicle.vehiculo.modelo.nombre,
                    patent: vehicle.vehiculo.patente,
                    color: vehicle.vehiculo.color.nombre,
                    idVehicle: vehicle.vehiculo.idVehiculo,
                    parked: vehicle.vehiculo.estacionado,
                });
            });
        }
        await saveUserInformation();
        setLogged(true);
        setCurrentData(true);
    };

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
                    space="sm"
                    height={height}
                    alignItems="center"
                    safeAreaTop={true}
                    style={styles.container}
                >
                    {viewToken == 5 ? (
                        <>
                            <Input defaultValue={loggedUser.user.tokenNotification ? loggedUser.user.tokenNotification : noToken}></Input>
                        </>
                    ) : null}
                    <Image
                        source={require("../image/logIn-icon-start.png")}
                        alt="logIn-icon-start"
                        resizeMode="contain"
                        style={styles.iconLogIn}
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
                            {/* <Stack flex={1.2}>
                                <Text style={styles.text}>Usuario</Text>
                            </Stack> */}
                            <HStack flex={2}>
                                <InputControlledCopyPaste
                                    name="user"
                                    control={control}
                                    style={styles.input}
                                    variant="unstiled"
                                    placeholder="Correo"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                ></InputControlledCopyPaste>
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
                            {/* <Stack flex={1.2}>
                                <Text style={styles.text}>Contraseña</Text>
                            </Stack> */}
                            <HStack flex={2}>
                                <InputControlledCopyPaste
                                    name="password"
                                    control={control}
                                    style={styles.input}
                                    secureTextEntry={hidePassword}
                                    variant="unstiled"
                                    placeholder="Contraseña"
                                    autoCapitalize="none"
                                ></InputControlledCopyPaste>
                            </HStack>
                            <TouchableOpacity
                                style={styles.touchVisiblePassword}
                                onPress={() => setHidePassword(!hidePassword)}
                            >
                                <Ionicons
                                    name={hidePassword ? "eye" : "eye-off"}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </HStack>
                    </LinearGradient>
                    <Button variant="link" onPress={handlePasswordRecovery}>
                        ¿Olvidó su contraseña?
                    </Button>
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
                    <TouchableOpacity
                        onPress={() => {
                            if (viewToken <= 5) {
                                setViewToken(viewToken+1);
                            } else {
                                setViewToken(0);
                            }
                        }}
                        touchSoundDisabled
                        activeOpacity={1}
                    >
                        <Image
                            source={constants.LOGO}
                            alt="logo-app"
                            resizeMode="contain"
                            style={styles.imageLogo}
                        ></Image>
                    </TouchableOpacity>
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
        height: "70@ms",
        marginBottom: "20@ms",
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
    icon: {
        color: "#04467C",
        fontSize: "25@ms",
    },
    touchVisiblePassword: {
        flex: 0.4,
    },
    container: {
        paddingTop: "60@ms",
    },
});
