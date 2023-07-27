import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import {
    NativeBaseProvider,
    Stack,
    Button,
    HStack,
    Select,
    AlertDialog,
    StatusBar,
} from "native-base";
import InputControlled from "../components/InputControlled";
import { ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import AlertNotice from "../components/Alerts/AlertNotice";
import { Ionicons } from "@expo/vector-icons";
import AlertError from "../components/Alerts/AlertError";

const { height } = Dimensions.get("screen");

const REGEX_EMAIL =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

const RegisterStep2Screen = ({ route, navigation }) => {
    const { typeDocument, numberDocument, name, surname, razonSocial } =
        route.params;

    const [listPhoneCompanies, setListPhoneCompanies] = useState([]);
    const [phoneCompanie, setPhoneCompanie] = useState();

    useEffect(() => {
        const obtainCompanies = async () => {
            try {
                const result = await constants.AXIOS_INST.get(
                    "companiasTelefono"
                );
                const companies = result.data.mensaje.map(
                    ({ idCompaniaTelefono, nombre }) => ({
                        value: idCompaniaTelefono,
                        label: nombre,
                    })
                );
                setListPhoneCompanies(companies);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error);
                }
                return;
            }
        };
        obtainCompanies();
    }, []);

    const { control, handleSubmit, watch } = useForm();

    const Register = async (data) => {
        const { email, phone } = data;

        const information = {
            usuario: {
                idTipoDocumento: typeDocument,
                idCompaniaTelefono: phoneCompanie,
                numeroDocumento: numberDocument.toString(),
                nombrePersona: name.trim(),
                apellido: surname.trim(),
                razonSocial: razonSocial ? razonSocial.trim() : null,
                email: email.trim(),
                nombreUsuario: email.trim(),
                numeroTelefono: phone,
            },
        };
        await constants.AXIOS_INST.post("usuario/registrar", information)
            .then((response) => {
                console.log(response.data.mensaje);
                setMessageAlertNotice(
                    "Su contraseña ha sido enviada a su correo electrónico. Registrado con éxito"
                );
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
    };

    const [invalidPhoneCompanie, setInvalidPhoneCompanie] = useState(false);

    const SuccessfulRegistration = async (data) => {
        if (phoneCompanie != null) {
            if (loading) {
                return;
            }
            setInvalidPhoneCompanie(false);
            setLoading(true);
            try {
                await Register(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        } else {
            setInvalidPhoneCompanie(true);
        }
    };

    const emailRepeat = watch("email");

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => setIsOpenAlertNotice(!isOpenAlertNotice);
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const CloseAlert = () => {
        onCloseAlertNotice();
        navigation.popToTop();
    };

    const [loading, setLoading] = useState(false);

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <Stack
                    space="sm"
                    height={"100%"}
                    alignItems="center"
                    safeAreaTop={true}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Stack space="sm">
                            <HStack
                                flex={1}
                                space="sm"
                                alignItems="center"
                                justifyContent="center"
                                marginY="7.5%"
                            >
                                <Entypo name="add-user" style={styles.icon} />
                                <Text style={styles.textHeaderRegister}>
                                    Registro
                                </Text>
                            </HStack>
                            <InputControlled
                                name="email"
                                placeholder="Correo electrónico"
                                control={control}
                                autoCapitalize="none"
                                width="85%"
                                rules={{
                                    required: " Correo electrónico requerido",
                                    pattern: {
                                        value: REGEX_EMAIL,
                                        message: " Correo electrónico inválido",
                                    },
                                }}
                            ></InputControlled>
                            <InputControlled
                                name="confirmEmail"
                                placeholder="Confirmar correo electrónico"
                                control={control}
                                autoCapitalize="none"
                                width="85%"
                                rules={{
                                    validate: (value) =>
                                        value === emailRepeat ||
                                        " El correo electrónico no es el mismo",
                                }}
                            ></InputControlled>
                            <HStack flex={1} minW="85%">
                                <Stack style={styles.containerPhoneCompanie}>
                                    <Text style={styles.textPhoneCompanie}>
                                        Compañía teléfono
                                    </Text>
                                </Stack>
                                <Select
                                    backgroundColor="white"
                                    borderBottomLeftRadius={0}
                                    borderTopLeftRadius={0}
                                    borderTopRightRadius={30}
                                    borderBottomRightRadius={30}
                                    flex={1}
                                    selectedValue={phoneCompanie}
                                    onValueChange={setPhoneCompanie}
                                    style={styles.selectPhoneCompanie}
                                >
                                    {listPhoneCompanies.map((companie) => (
                                        <Select.Item
                                            key={companie.value}
                                            label={companie.label}
                                            value={companie.value}
                                        ></Select.Item>
                                    ))}
                                </Select>
                            </HStack>
                            {invalidPhoneCompanie ? (
                                <Stack>
                                    <Text style={styles.error}>
                                        <Ionicons
                                            name="warning-outline"
                                            style={styles.iconError}
                                        />
                                        {" Seleccione compañía de teléfono"}
                                    </Text>
                                </Stack>
                            ) : null}
                            <InputControlled
                                keyboardType="numeric"
                                name="phone"
                                placeholder="Número teléfono"
                                control={control}
                                width="85%"
                                rules={{
                                    required: " Número de teléfono requerido",
                                    minLength: {
                                        value: 10,
                                        message:
                                            " Número inválido, debe ingresarse con la característica completa y sin el 15 (Ej.: 3564112233)",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message:
                                            " Número inválido, debe ingresarse con la característica completa y sin el 15 (Ej.: 3564112233)",
                                    },
                                }}
                            ></InputControlled>
                            <Text style={styles.textNote}>
                                *Ej: 3564112233, sin el "0" y sin el "15"
                            </Text>
                            {loading ? (
                                <Button
                                    isLoading
                                    marginTop="15%"
                                    style={styles.buttonNextStep}
                                    isLoadingText={
                                        <Text style={styles.textNextStep}>
                                            Registrando
                                        </Text>
                                    }
                                    spinnerPlacement="end"
                                ></Button>
                            ) : (
                                <Button
                                    onPress={handleSubmit(
                                        SuccessfulRegistration
                                    )}
                                    marginTop="15%"
                                    style={styles.buttonNextStep}
                                    endIcon={
                                        <Feather
                                            name="check-circle"
                                            style={styles.textNextStep}
                                        />
                                    }
                                >
                                    <Text style={styles.textNextStep}>
                                        Registrarse
                                    </Text>
                                </Button>
                            )}
                        </Stack>
                    </ScrollView>
                    <AlertNotice
                        isOpen={isOpenAlertNotice}
                        cancelRef={cancelRefAlertNotice}
                        onClose={CloseAlert}
                        message={messageAlertNotice}
                    ></AlertNotice>
                    <AlertError
                        isOpen={isOpenAlertError}
                        cancelRef={cancelRefAlertError}
                        onClose={onCloseAlertError}
                        message={messageAlertError}
                    ></AlertError>
                </Stack>
            </ImageBackground>
        </NativeBaseProvider>
    );
};

export default RegisterStep2Screen;

const styles = ScaledSheet.create({
    textHeaderRegister: {
        fontSize: "30@ms",
        fontWeight: "bold",
        color: "#04467C",
    },
    icon: {
        fontSize: "30@ms",
        color: "#04467C",
    },
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerPhoneCompanie: {
        justifyContent: "center",
        backgroundColor: "white",
        minHeight: "45@ms",
        borderColor: "#d3d3d5",
        borderWidth: "1@ms",
        flex: 1,
        borderTopLeftRadius: "30@ms",
        borderBottomLeftRadius: "30@ms",
        paddingLeft: "8.5%",
        borderEndWidth: 0,
    },
    buttonNextStep: {
        borderRadius: "30@ms",
        backgroundColor: "#04467C",
    },
    textPhoneCompanie: {
        fontSize: "15@ms",
    },
    selectPhoneCompanie: {
        fontSize: "15@ms",
        height: "45@ms",
    },
    textNextStep: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
    error: {
        color: "red",
        fontSize: "15@ms",
    },
    iconError: {
        color: "red",
        fontSize: "24@ms",
    },
    textNote: {
        paddingLeft: "20@ms",
    },
});
