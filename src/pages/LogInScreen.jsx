import {
    ImageBackground,
    Text,
    Alert,
    Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
    Button,
    HStack,
    Image,
    NativeBaseProvider,
    StatusBar,
    VStack,
} from "native-base";
import { ScaledSheet } from "react-native-size-matters";
import InputControlled from "../components/InputControlled";
import { useForm } from "react-hook-form";
import constants from "../constants/constants";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("screen");

const LogInScreen = ({ navigation }) => {
    const { control, handleSubmit, watch } = useForm();
    const [loading, setLoading] = useState(false);

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

        try {
            console.log(logIn);
            const response = await constants.AXIOS_INST.post(
                "usuario/logIn",
                logIn
            );
            console.log(response.data.mensaje);
            navigation.navigate("Parking", response.data);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
        setLoading(false);
    };

    const Register = () => {
        navigation.navigate("Register1");
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
                    <Image source={require("../image/logIn-icon-start.png")} alt="logIn-icon-start" size="20%" resizeMode="center"></Image>
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
                            <Text style={styles.text}>Usuario</Text>
                            <InputControlled
                                name="user"
                                control={control}
                                style={styles.inputUser}
                                variant="unstiled"
                            ></InputControlled>
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
                            <Text style={styles.text}>Contraseña</Text>
                            <InputControlled
                                name="password"
                                control={control}
                                style={styles.input}
                                secureTextEntry={true}
                                variant="unstiled"
                            ></InputControlled>
                        </HStack>
                    </LinearGradient>
                    <Button variant="link">¿Olvidó su contraseña?</Button>
                    <Button onPress={handleSubmit(LogIn)} style={styles.button}>
                        <Text style={styles.textButton}>{loading ? "Ingresando..." : "Ingresar"}</Text>
                    </Button>
                    <Text>¿No tienes cuenta?</Text>
                    <Button onPress={Register} style={styles.button}>
                        <Text style={styles.textButton}>Registrarse</Text>
                    </Button>
                    <Image source={require("../image/logo-app.png")} alt="logo-app" size="40%" resizeMode="contain" maxH="15%"></Image>
                </VStack>
            </ImageBackground>
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
    inputUser: {
        fontSize: "17@ms",
        marginLeft: "27@ms",
    },
    text: {
        fontSize: "17@ms",
        color: "#565656",
    },
    button: {
        borderRadius: "30@ms",
        backgroundColor: "#04467C",
        minWidth: "50%"
    },
    textButton: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
});
