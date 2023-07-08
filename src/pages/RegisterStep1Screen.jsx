import {
    Alert,
    Dimensions,
    ImageBackground,
    StatusBar,
    Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NativeBaseProvider, Stack, Button, HStack, Select } from "native-base";
import InputControlled from "../components/InputControlled";
import { ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

const RegisterStep1Screen = ({ navigation }) => {
    const [listTypesDocuments, setListTypesDocuments] = useState([]);
    const [typeDocument, setTypeDocument] = useState(null);
    const [invalidTypeDocument, setInvalidTypeDocument] = useState(false);

    useEffect(() => {
        const obtainDocuments = async () => {
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
        };
        obtainDocuments();
    }, []);

    const { control, handleSubmit } = useForm();

    const NextStep = (data) => {
        const { numberDocument, name, surname, razonSocial } = data;
        if (typeDocument != null) {
            setInvalidTypeDocument(false);
            try {
                navigation.navigate("Register2", {
                    typeDocument,
                    numberDocument,
                    name,
                    surname,
                    razonSocial,
                });
            } catch (e) {
                Alert.alert("Error", e.message);
            }
        } else {
            setInvalidTypeDocument(true);
        }
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
                    alignItems="center"
                    safeAreaTop={true}
                    height={"100%"}
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
                            <HStack flex={1} minW="85%">
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
                                    selectedValue={typeDocument}
                                    onValueChange={setTypeDocument}
                                    style={styles.selectTypeDocument}
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
                            {invalidTypeDocument ? (
                                <Stack>
                                    <Text style={styles.error}>
                                        <Ionicons
                                            name="warning-outline"
                                            style={styles.iconError}
                                        />
                                        {" Seleccione un tipo de Documento"}
                                    </Text>
                                </Stack>
                            ) : null}
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
                            ></InputControlled>
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
                            ></InputControlled>
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
                            ></InputControlled>
                            <InputControlled
                                name="razonSocial"
                                placeholder="Razón social"
                                control={control}
                                width="85%"
                                rules={{
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/,
                                        message:
                                            " La razón social solo puede contener letras y espacios",
                                    },
                                }}
                            ></InputControlled>
                            <Button
                                onPress={handleSubmit(NextStep)}
                                marginTop="15%"
                                style={styles.buttonNextStep}
                                endIcon={
                                    <Feather
                                        name="arrow-right-circle"
                                        style={styles.textNextStep}
                                    />
                                }
                            >
                                <Text style={styles.textNextStep}>
                                    Siguiente paso
                                </Text>
                            </Button>
                        </Stack>
                    </ScrollView>
                </Stack>
            </ImageBackground>
        </NativeBaseProvider>
    );
};

export default RegisterStep1Screen;

const styles = ScaledSheet.create({
    imageBackground: {
        flex: 1,
    },
    textHeaderRegister: {
        fontSize: "30@ms",
        fontWeight: "bold",
        color: "#04467C",
    },
    icon: {
        fontSize: "30@ms",
        color: "#04467C",
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
        paddingLeft: "8.5%",
        borderEndWidth: 0,
    },
    textTypeDocument: {
        fontSize: "15@ms",
    },
    selectTypeDocument: {
        fontSize: "15@ms",
        height: "45@ms",
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
    error: {
        color: "red",
        fontSize: "15@ms",
    },
    iconError: {
        color: "red",
        fontSize: "24@ms",
    },
});
