import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
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
const { width } = Dimensions.get("window");

const ProfileScreen = () => {
    return (
        <NativeBaseProvider>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height="100%"
                alignItems="center"
                safeAreaTop={true}
            >
                <HStack style={styles.containerHeader}>
                    <FontAwesome5 name="parking" size={24} color="white" />
                    <Spacer></Spacer>
                    <Text style={styles.textHeader}>
                        Estacionamiento medido
                    </Text>
                    <Spacer></Spacer>
                    <Button variant="ghost">
                        <Feather name="menu" size={30} color="white" />
                    </Button>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <Ionicons
                        name="person-add-sharp"
                        size={24}
                        color="#3f60af"
                    />
                    <Text style={styles.textProfile}>Perfil</Text>
                </Stack>
                <ScrollView>
                    <Stack space="sm" minW="85%">
                        <Input
                            style={styles.inputProfile}
                            placeholder="Nombres"
                            borderRadius={30}
                        ></Input>
                        <Input
                            style={styles.inputProfile}
                            placeholder="Apellido"
                            borderRadius={30}
                        ></Input>
                        <HStack flex={1} maxW="82%">
                            <Stack style={styles.containerTypeDocument}>
                                <Text style={styles.textTypeDocument}>Tipo de Documento</Text>
                            </Stack>
                            <Select
                                backgroundColor="white"
                                borderBottomLeftRadius={0}
                                borderTopLeftRadius={0}
                                borderTopRightRadius={30}
                                borderBottomRightRadius={30}
                                minW="54%"
                            ></Select>
                        </HStack>
                        <Input
                            style={styles.inputProfile}
                            placeholder="Nro."
                            borderRadius={30}
                        ></Input>
                        <Input
                            style={styles.inputProfile}
                            placeholder="Razón Social"
                            borderRadius={30}
                        ></Input>
                        <Input
                            style={styles.inputProfile}
                            placeholder="e-mail"
                            borderRadius={30}
                        ></Input>
                        <Input
                            style={styles.inputProfile}
                            placeholder="Nro. de celular"
                            borderRadius={30}
                        ></Input>
                        <Button
                            startIcon={
                                <SimpleLineIcons
                                    name="lock"
                                    size={24}
                                    color="white"
                                />
                            }
                            style={styles.buttonChangePassword}
                        >
                            <Text style={styles.textChangePassword}>
                                Cambiar Clave
                            </Text>
                        </Button>
                        <HStack space={1} maxW="85%">
                            <Button
                                startIcon={
                                    <SimpleLineIcons
                                        name="check"
                                        size={16}
                                        color="white"
                                    />
                                }
                                style={styles.buttonSave}
                            >
                                <Text style={styles.textButtonsEnd}>
                                    Guardar Cambios
                                </Text>
                            </Button>
                            <Button
                                startIcon={
                                    <SimpleLineIcons
                                        name="close"
                                        size={16}
                                        color="white"
                                    />
                                }
                                style={styles.buttonCancel}
                            >
                                <Text style={styles.textButtonsEnd}>
                                    Cancelar
                                </Text>
                            </Button>
                        </HStack>
                    </Stack>
                </ScrollView>
            </Stack>
        </NativeBaseProvider>
    );
};

export default ProfileScreen;

const styles = ScaledSheet.create({
    containerHeader: {
        minHeight: "7%",
        minWidth: "90%",
        borderRadius: "5@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    textHeader: {
        fontSize: "18@ms",
        fontWeight: "bold",
        color: "white",
    },
    containerProfile: {
        minHeight: "5%",
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
        minHeight: "7%",
        backgroundColor: "white",
        paddingLeft: "8.5%",
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
        minWidth: "49%",
    },
    buttonCancel: {
        justifyContent: "flex-start",
        borderRadius: "30@ms",
        backgroundColor: "#ee1d23",
        minWidth: "49%",
    },
    textButtonsEnd: {
        color: "white",
        fontSize: "13@ms",
    },
});
