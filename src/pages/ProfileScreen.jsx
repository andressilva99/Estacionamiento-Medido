import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Button,
    Flex,
    HStack,
    Input,
    NativeBaseProvider,
    Select,
    Spacer,
    Stack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import HeaderPage from "../components/HeaderPage";
import { useForm } from "react-hook-form";
import InputControlled from "../components/InputControlled";
import loggedUser from "../objects/user";
import constants from "../constants/constants";
import { saveUserInformation } from "../functions/saveUserInformation";


const REGEX_EMAIL =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

const ProfileScreen = ({ navigation }) => {
    const { control, handleSubmit } = useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const [listTypesDocuments, setListTypesDocuments] = useState([]);
    const [typeDocument, setTypeDocument] = useState();

    useEffect(() => {
        console.log(loggedUser.user.typeDocument.name);
    }, []);

    const obtainDocuments = async () => {
        if (listTypesDocuments != []) {
            try {
                const result = await constants.AXIOS_INST.get(
                    "tiposDocumentos"
                );
                const typesDocuments = result.data.mensaje.map(
                    ({ idTipoDocumento, nombre }) => ({
                        value: idTipoDocumento,
                        label: nombre,
                    })
                );
                setListTypesDocuments(typesDocuments);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    const handleChangePasswordPress = () => {
        navigation.navigate("ChangePassword")
    }

    const modifyUserData = (modifyUser) => {
        loggedUser.user.documentNumber = modifyUser.usuario.numeroDocumento;
        loggedUser.user.email = modifyUser.usuario.email;
        loggedUser.user.firstName = modifyUser.usuario.nombrePersona;
        loggedUser.user.lastName = modifyUser.usuario.apellido;
        loggedUser.user.numberPhone = modifyUser.usuario.numeroTelefono;
        loggedUser.user.razonSocial = modifyUser.usuario.razonSocial;
        saveUserInformation();
    };

    const ModifyUser = async (data) => {
        const { name, surname, numberDocument, razonSocial, email, phone } =
            data;

        const modifyUser = {
            usuario: {
                idUsuario: loggedUser.user.idUser,
                idTipoDocumento: 1,
                idCompaniaTelefono: 1,
                numeroDocumento: numberDocument
                    ? numberDocument
                    : loggedUser.user.documentNumber,
                nombrePersona: name ? name : loggedUser.user.firstName,
                apellido: surname ? surname : loggedUser.user.lastName,
                nombreUsuario: loggedUser.user.userName,
                razonSocial: razonSocial,
                email: email ? email : loggedUser.user.email,
                numeroTelefono: phone ? phone : loggedUser.user.numberPhone,
            },
        };

        const config = {
            headers: {
                Authorization: `bearer ${loggedUser.user.token}`,
            },
        };

        await constants.AXIOS_INST.put(
            "usuario/modificarUsuario",
            modifyUser,
            config
        )
            .then((response) => alert(response.data.mensaje))
            .catch((error) => alert(error.response.data.mensaje));

        modifyUserData(modifyUser);

        setIsDisabled(!isDisabled);
    };

    return (
        <NativeBaseProvider>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height="100%"
                alignItems="center"
                safeAreaTop={true}
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <Ionicons
                        name="person-add-sharp"
                        style={styles.icon}
                        color="#3f60af"
                    />
                    <Text style={styles.textProfile}>Perfil</Text>
                </Stack>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack space="sm" minW="85%">
                        <HStack>
                            <InputControlled
                                name="name"
                                placeholder="Nombre"
                                control={control}
                                width="85%"
                                rules={{ required: " Nombre requerido" }}
                                defaultValue={loggedUser.user.firstName}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        <HStack>
                            <InputControlled
                                name="surname"
                                placeholder="Apellido"
                                control={control}
                                width="85%"
                                rules={{ required: " Apellido requerido" }}
                                defaultValue={loggedUser.user.lastName}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        <HStack flex={1} isDisabled={isDisabled}>
                            <Stack style={styles.containerTypeDocument}>
                                <Text style={styles.textTypeDocument}>
                                    Tipo de Documento
                                </Text>
                            </Stack>
                            <Select
                                backgroundColor="white"
                                borderBottomLeftRadius={0}
                                borderTopLeftRadius={0}
                                borderTopRightRadius={30}
                                borderBottomRightRadius={30}
                                flex={1}
                                isDisabled={isDisabled}
                                placeholder={loggedUser.user.typeDocument.name}
                            >
                                {listTypesDocuments.map((documen) => (
                                    <Select.Item
                                        key={documen.value}
                                        label={documen.label}
                                        value={documen.value}
                                    ></Select.Item>
                                ))}
                            </Select>
                        </HStack>
                        <HStack>
                            <InputControlled
                                keyboardType="numeric"
                                name="numberDocument"
                                placeholder="Número de Documento"
                                control={control}
                                width="85%"
                                rules={{
                                    required: " Número de Documento requerido",
                                }}
                                defaultValue={loggedUser.user.documentNumber}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        <HStack>
                            <InputControlled
                                name="razonSocial"
                                placeholder="Razón social"
                                control={control}
                                width="85%"
                                rules={{}}
                                defaultValue={loggedUser.user.razonSocial}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        <HStack>
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
                                defaultValue={loggedUser.user.email}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        <HStack>
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
                                defaultValue={loggedUser.user.numberPhone}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        {isDisabled ? (
                            <Button
                                startIcon={
                                    <SimpleLineIcons
                                        name="lock"
                                        style={styles.icon}
                                        color="white"
                                    />
                                }
                                style={styles.buttonChangePassword}
                                onPress={() => {
                                    obtainDocuments();
                                    setIsDisabled(!isDisabled);
                                }}
                            >
                                <Text style={styles.textChangePassword}>
                                    Editar Datos
                                </Text>
                            </Button>
                        ) : (
                            <HStack space={1} flex={1}>
                                <Button
                                    startIcon={
                                        <SimpleLineIcons
                                            name="close"
                                            style={styles.iconSubButtons}
                                            color="white"
                                        />
                                    }
                                    style={styles.buttonCancel}
                                    onPress={() => setIsDisabled(!isDisabled)}
                                >
                                    <Text style={styles.textButtonsEnd}>
                                        Cancelar
                                    </Text>
                                </Button>
                                <Button
                                    startIcon={
                                        <SimpleLineIcons
                                            name="check"
                                            style={styles.iconSubButtons}
                                            color="white"
                                        />
                                    }
                                    style={styles.buttonSave}
                                    onPress={handleSubmit(ModifyUser)}
                                >
                                    <Text style={styles.textButtonsEnd}>
                                        Guardar Cambios
                                    </Text>
                                </Button>
                            </HStack>
                        )}
                        <Button
                            startIcon={
                                <SimpleLineIcons
                                    name="lock"
                                    style={styles.icon}
                                    color="white"
                                />
                            }
                            style={styles.buttonChangePassword}
                            onPress={handleChangePasswordPress}
                        >
                            <Text style={styles.textChangePassword}>
                                Cambiar Clave
                            </Text>
                        </Button>
                    </Stack>
                </ScrollView>
            </Stack>
        </NativeBaseProvider>
    );
};

export default ProfileScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerProfile: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "3%",
    },
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
    inputProfile: {
        minHeight: "45@ms",
        backgroundColor: "white",
        paddingLeft: "8.5%",
    },
    containerTypeDocument: {
        justifyContent: "center",
        backgroundColor: "white",
        minHeight: "45@ms",
        borderColor: "#d3d3d5",
        borderWidth: "1@ms",
        flex: 1,
        borderTopLeftRadius: "30@ms",
        borderBottomLeftRadius: "30@ms",
        paddingLeft: "20@ms",
        borderEndWidth: 0,
    },
    textTypeDocument: {
        fontSize: "11@ms",
    },
    buttonChangePassword: {
        borderRadius: "30@ms",
        backgroundColor: "#3f98d4",
        justifyContent: "flex-start",
    },
    textChangePassword: {
        color: "white",
        fontSize: "18@ms",
        fontWeight: "bold",
    },
    buttonSave: {
        justifyContent: "flex-start",
        borderRadius: "30@ms",
        backgroundColor: "#02a44e",
        flex: 1.2,
    },
    buttonCancel: {
        justifyContent: "flex-start",
        borderRadius: "30@ms",
        backgroundColor: "#ee1d23",
        flex: 1,
    },
    textButtonsEnd: {
        color: "white",
        fontSize: "13@ms",
    },
    icon: {
        fontSize: "25@ms",
    },
    iconSubButtons: {
        fontSize: "16@ms"
    },
});
