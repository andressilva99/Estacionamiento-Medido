import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import AlertNotice from "../components/Alerts/AlertNotice";
import AlertError from "../components/Alerts/AlertError";
import AlertNoticeFunction from "../components/Alerts/AlertNoticeFunction";

const REGEX_EMAIL =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}\s*$/i;

const ProfileScreen = ({ navigation }) => {
    const { control, handleSubmit } = useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const [listTypesDocuments, setListTypesDocuments] = useState([]);
    const [typeDocument, setTypeDocument] = useState(
        loggedUser.user.typeDocument.idTypeDocument
    );
    const [listPhoneCompanies, setListPhoneCompanies] = useState([]);
    const [phoneCompanie, setPhoneCompanie] = useState(
        loggedUser.user.phoneCompany.idPhoneCompany
    );

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => setIsOpenAlertNotice(!isOpenAlertNotice);
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [loading, setLoading] = useState(false);

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [
        isOpenAlertNoticeFunctionDelAcount,
        setIsOpenAlertNoticeFunctionDelAcount,
    ] = useState(false);
    const cancelRefAlertNoticeFunctionDelAcount = useRef(null);
    const onCloseAlertNoticeFunctionDelAcount = () =>
        setIsOpenAlertNoticeFunctionDelAcount(
            !isOpenAlertNoticeFunctionDelAcount
        );

    const deleteAcount = async () => {
        setIsOpenAlertNoticeFunctionDelAcount(false);
        Linking.openURL(constants.LINK_DELETE_ACOUNT).catch((error) => {
            console.error("Error al abrir el enlace:", error);
        });
        await logOut();
    };

    const logOut = async () => {
        let logOutUser = true;
        loggedUser.user.vehicles.forEach((vehicle) => {
            if (vehicle.parked) {
                logOutUser = false;
                return;
            }
        });
        if (logOutUser) {
            await constants
                .AXIOS_INST({
                    method: "post",
                    url: "usuario/logOut",
                    headers: {
                        Authorization: `bearer ${loggedUser.user.token}`,
                    },
                    data: {
                        usuario: {
                            idUsuario: loggedUser.user.idUser,
                        },
                    },
                })
                .then((resp) => {
                    deleteUserData();
                    setLogged(false);
                    setSubMenu(false);
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
        } else {
            onCloseAlertNoticeFunction();
            setMessageAlertError(
                "No se puede cerrar sesión con un vehículo estacionado"
            );
            setIsOpenAlertError(true);
        }
    };

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
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error);
                }
                return;
            }
        }
    };

    const obtainCompanies = async () => {
        try {
            const result = await constants.AXIOS_INST.get("companiasTelefono");
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

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    const handleChangePasswordPress = () => {
        navigation.navigate("ChangePassword");
    };

    const modifyUserData = (modifyUser) => {
        loggedUser.user.documentNumber = modifyUser.usuario.numeroDocumento;
        loggedUser.user.email = modifyUser.usuario.email.trim();
        loggedUser.user.firstName = modifyUser.usuario.nombrePersona.trim();
        loggedUser.user.lastName = modifyUser.usuario.apellido.trim();
        loggedUser.user.numberPhone = modifyUser.usuario.numeroTelefono;
        loggedUser.user.razonSocial = modifyUser.usuario.razonSocial.trim();
        loggedUser.user.typeDocument.idTypeDocument = typeDocument;
        loggedUser.user.phoneCompany.idPhoneCompany = phoneCompanie;

        saveUserInformation();
    };

    const ModifyUser = async (data) => {
        setLoading(true);
        const { name, surname, numberDocument, razonSocial, email, phone } =
            data;

        const modifyUser = {
            usuario: {
                idUsuario: loggedUser.user.idUser,
                idTipoDocumento: typeDocument,
                idCompaniaTelefono: phoneCompanie,
                numeroDocumento: numberDocument
                    ? numberDocument
                    : loggedUser.user.documentNumber,
                nombrePersona: name ? name.trim() : loggedUser.user.firstName,
                apellido: surname ? surname.trim() : loggedUser.user.lastName,
                razonSocial: razonSocial
                    ? razonSocial.trim()
                    : loggedUser.user.razonSocial,
                email: email ? email.trim() : loggedUser.user.email,
                numeroTelefono: phone ? phone : loggedUser.user.numberPhone,
                nombreUsuario: email ? email.trim() : loggedUser.user.email,
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
            .then((response) => {
                setMessageAlertNotice("Datos Actualizados");
                setIsOpenAlertNotice(true);
                modifyUserData(modifyUser);
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

        setIsDisabled(!isDisabled);
        setLoading(false);
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
                <HStack>
                    <HeaderPage
                        onPress={handleButtonPressMenu}
                        navigation={navigation}
                    ></HeaderPage>
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
                                rules={{
                                    required: " Nombre requerido",
                                    minLength: {
                                        value: 3,
                                        message:
                                            " El nombre debe tener al menos 3 caracteres",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message:
                                            " El nombre no debe exceder los 30 caracteres",
                                    },
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/,
                                        message:
                                            "El nombre solo puede contener letras y espacios",
                                    },
                                }}
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
                                rules={{
                                    required: " Apellido requerido",
                                    minLength: {
                                        value: 3,
                                        message:
                                            " El apellido debe tener al menos 3 caracteres",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message:
                                            " El apellido no debe exceder los 30 caracteres",
                                    },
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/,
                                        message:
                                            " El apellido solo puede contener letras y espacios",
                                    },
                                }}
                                defaultValue={loggedUser.user.lastName}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        <HStack flex={1} isDisabled={isDisabled}>
                            <Stack
                                style={
                                    isDisabled
                                        ? styles.containerTypeDocumentDisable
                                        : styles.containerTypeDocumentEnable
                                }
                            >
                                <Text
                                    style={
                                        isDisabled
                                            ? styles.textTypeDocumentDisable
                                            : styles.textTypeDocumentEnable
                                    }
                                >
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
                                style={styles.selectTypeDocument}
                                borderColor={"gray.400"}
                                selectedValue={typeDocument}
                                onValueChange={setTypeDocument}
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
                                    pattern: {
                                        value: /^[0-9]{7,11}$/,
                                        message:
                                            " El número de documento debe contener 7 u 11 dígitos numéricos",
                                    },
                                }}
                                defaultValue={loggedUser.user.documentNumber}
                                isDisabled={isDisabled}
                            ></InputControlled>
                        </HStack>
                        {typeDocument == 2 ? (
                            <HStack>
                                <InputControlled
                                    name="razonSocial"
                                    placeholder="Razón social"
                                    control={control}
                                    width="85%"
                                    rules={{
                                        required:
                                            " La Razón Social es requerida",
                                        pattern: {
                                            value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/,
                                            message:
                                                " La razón social solo puede contener letras y espacios",
                                        },
                                    }}
                                    defaultValue={loggedUser.user.razonSocial}
                                    isDisabled={isDisabled}
                                ></InputControlled>
                            </HStack>
                        ) : null}
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
                                isDisabled={true}
                            ></InputControlled>
                        </HStack>
                        <HStack flex={1} isDisabled={isDisabled}>
                            <Stack
                                style={
                                    isDisabled
                                        ? styles.containerTypeDocumentDisable
                                        : styles.containerTypeDocumentEnable
                                }
                            >
                                <Text
                                    style={
                                        isDisabled
                                            ? styles.textTypeDocumentDisable
                                            : styles.textTypeDocumentEnable
                                    }
                                >
                                    Companía Teléfono
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
                                placeholder={loggedUser.user.phoneCompany.name}
                                style={styles.selectTypeDocument}
                                borderColor={"gray.400"}
                                selectedValue={phoneCompanie}
                                onValueChange={setPhoneCompanie}
                            >
                                {listPhoneCompanies.map((phone) => (
                                    <Select.Item
                                        key={phone.value}
                                        label={phone.label}
                                        value={phone.value}
                                    ></Select.Item>
                                ))}
                            </Select>
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
                                        message:
                                            " Número inválido, debe ingresarse con la característica completa y sin el 15 (Ej.: 3564112233)",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message:
                                            " Número inválido, debe ingresarse con la característica completa y sin el 15 (Ej.: 3564112233)",
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
                                style={[
                                    styles.buttonChangePassword,
                                    { backgroundColor: "#009FE3" },
                                ]}
                                onPress={() => {
                                    obtainDocuments();
                                    obtainCompanies();
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
                                {loading ? (
                                    <Button
                                        isLoading
                                        startIcon={
                                            <SimpleLineIcons
                                                name="check"
                                                style={styles.iconSubButtons}
                                                color="white"
                                            />
                                        }
                                        style={styles.buttonSave}
                                        isLoadingText={
                                            <Text style={styles.textButtonsEnd}>
                                                Guardando Cambios
                                            </Text>
                                        }
                                        spinnerPlacement="end"
                                    ></Button>
                                ) : (
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
                                )}
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
                            style={[
                                styles.buttonChangePassword,
                                { backgroundColor: "#086EC1" },
                            ]}
                            onPress={handleChangePasswordPress}
                        >
                            <Text style={styles.textChangePassword}>
                                Cambiar Clave
                            </Text>
                        </Button>
                        <Button
                            startIcon={
                                <FontAwesome5
                                    name="user-alt-slash"
                                    style={styles.icon}
                                    color="white"
                                />
                            }
                            style={[
                                styles.buttonChangePassword,
                                { backgroundColor: "#05509C" },
                            ]}
                            onPress={() =>
                                setIsOpenAlertNoticeFunctionDelAcount(true)
                            }
                        >
                            <Text style={styles.textChangePassword}>
                                Eliminar cuenta
                            </Text>
                        </Button>
                    </Stack>
                </ScrollView>
            </Stack>
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
            <AlertNoticeFunction
                isOpen={isOpenAlertNoticeFunctionDelAcount}
                cancelRef={cancelRefAlertNoticeFunctionDelAcount}
                onClose={onCloseAlertNoticeFunctionDelAcount}
                message={
                    '¿Está seguro que desea Eliminar la Cuenta? Si pulsa "Aceptar" se redireccionará a la página correspondiente y se cerrará la sesión'
                }
                onPressAccept={deleteAcount}
            ></AlertNoticeFunction>
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
    selectTypeDocument: {
        fontSize: "14@ms",
        height: "45@ms",
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
    containerTypeDocumentEnable: {
        justifyContent: "center",
        backgroundColor: "white",
        minHeight: "45@ms",
        borderColor: "#999da3",
        borderWidth: "1@ms",
        flex: 1,
        borderTopLeftRadius: "30@ms",
        borderBottomLeftRadius: "30@ms",
        paddingLeft: "20@ms",
        borderEndWidth: 0,
    },
    containerTypeDocumentDisable: {
        justifyContent: "center",
        backgroundColor: "#f7f7fa",
        minHeight: "45@ms",
        borderColor: "#d3d3d5",
        borderWidth: "1@ms",
        flex: 1,
        borderTopLeftRadius: "30@ms",
        borderBottomLeftRadius: "30@ms",
        paddingLeft: "20@ms",
        borderEndWidth: 0,
    },
    textTypeDocumentEnable: {
        fontSize: "14@ms",
    },
    textTypeDocumentDisable: {
        fontSize: "14@ms",
        color: "#999da3",
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
        fontSize: "16@ms",
    },
});
