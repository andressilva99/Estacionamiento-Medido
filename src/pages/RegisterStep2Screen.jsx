import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
                console.error(error);
            }
        };
        obtainCompanies();
    }, []);

    const { control, handleSubmit, watch } = useForm();

    const Register = async (data) => {
        const { user, email, phone } = data;

        const information = {
            usuario: {
                idTipoDocumento: typeDocument,
                idCompaniaTelefono: phoneCompanie,
                numeroDocumento: numberDocument.toString(),
                nombrePersona: name,
                apellido: surname,
                nombreUsuario: user,
                razonSocial: razonSocial,
                email: email,
                numeroTelefono: phone,
            },
        };
        await constants.AXIOS_INST.post("usuario/registrar", information)
            .then((response) => {
                alert(response.data.mensaje);
            })
            .catch((error) => {
                alert(error.response.data.mensaje);
            });
    };

    const SuccessfulRegistration = async (data) => {
        try {
            await Register(data);
            setResponse(true);
        } catch (error) {
            console.log(error);
        }
    };

    const emailRepeat = watch("email");

    const [response, setResponse] = useState(false);
    const closeResponse = () => setResponse(false);

    const CloseAlert = () => {
        closeResponse();
        navigation.popToTop();
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <Stack
                    space="sm"
                    height={height}
                    alignItems="center"
                    safeAreaTop={true}
                >
                    <ScrollView>
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
                                name="user"
                                placeholder="Nombre de usuario"
                                control={control}
                                width="85%"
                                rules={{
                                    required: " Nombre de usuario requerido",
                                    minLength: {
                                        value: 5,
                                        message: " Mínimo 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: " Máximo 16 caracteres",
                                    },
                                }}
                            ></InputControlled>
                            <InputControlled
                                name="email"
                                placeholder="Correo electrónico"
                                control={control}
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
                                        message: " Número de teléfono inválido",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: " Número de teléfono inválido",
                                    },
                                }}
                            ></InputControlled>
                            <Button
                                onPress={handleSubmit(SuccessfulRegistration)}
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
                        </Stack>
                    </ScrollView>
                    <AlertDialog isOpen={response} onClose={closeResponse}>
                        <AlertDialog.Content>
                            <AlertDialog.Body>
                                Ahora puede iniciar sesión
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button onPress={CloseAlert}>Aceptar</Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
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
    textPhoneCompanie: {
        fontSize: "15@ms",
    },
    buttonNextStep: {
        borderRadius: "30@ms",
        backgroundColor: "#04467C",
    },
    textNextStep: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
    selectPhoneCompanie: {
        fontSize: "15@ms"
    },
});
