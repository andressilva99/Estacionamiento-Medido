import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NativeBaseProvider, Stack, Button, HStack, Select } from "native-base";
import InputControlled from "../components/InputControlled";
import { ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import constants from "../constants/constants";

const RegisterStep1Screen = () => {
    const [listTypesDocuments, setListTypesDocuments] = useState([]);
    const [typeDocument, setTypeDocument] = useState();

    useEffect(() => {
        const obtainDocuments = async () => {
            try {
                const result = await constants.AXIOS_INST.get('tiposDocumentos');
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

    const navigation = useNavigation();

    const { control, handleSubmit } = useForm();

    const NextStep = (data) => {
        const { numberDocument, name, surname, razonSocial } = data;
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
                        <HStack flex={1} maxW="82%">
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
                                minW="54%"
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
                        <InputControlled
                            keyboardType="numeric"
                            name="numberDocument"
                            placeholder="Número de Documento"
                            control={control}
                            width="85%"
                            rules={{
                                required: " Número de Documento requerido",
                            }}
                        ></InputControlled>
                        <InputControlled
                            name="name"
                            placeholder="Nombre"
                            control={control}
                            width="85%"
                            rules={{ required: " Nombre requerido" }}
                        ></InputControlled>
                        <InputControlled
                            name="surname"
                            placeholder="Apellido"
                            control={control}
                            width="85%"
                            rules={{ required: " Apellido requerido" }}
                        ></InputControlled>
                        <InputControlled
                            name="razonSocial"
                            placeholder="Razón social"
                            control={control}
                            width="85%"
                            // rules={{ }}
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
        </NativeBaseProvider>
    );
};

export default RegisterStep1Screen;

const styles = ScaledSheet.create({
    textHeaderRegister: {
        fontSize: "30@ms",
        fontWeight: "bold",
    },
    icon: {
        fontSize: "30@ms",
    },
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerTypeDocument: {
        justifyContent: "center",
        backgroundColor: "white",
        minHeight: "7%",
        borderColor: "#d3d3d5",
        borderWidth: "1@ms",
        minWidth: "55%",
        borderTopLeftRadius: "30@ms",
        borderBottomLeftRadius: "30@ms",
        paddingLeft: "8.5%",
        borderEndWidth: 0,
    },
    textTypeDocument: {
        fontSize: "11@ms",
    },
    buttonNextStep: {
        borderRadius: "30@ms",
        backgroundColor: "#fb9b20",
    },
    textNextStep: {
        fontSize: "20@ms",
        fontWeight: "bold",
        color: "white",
    },
});
