import { StyleSheet, Text} from "react-native";
import React from "react";
import { Button, HStack, Input, NativeBaseProvider, Spacer, Stack } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import HeaderPage from "../components/HeaderPage";


const ChangePasswordScreen = () => {
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
                <Stack
                    flexDirection="row"
                    style={styles.containerChangePassword}
                >
                    <SimpleLineIcons name="lock" size={24} color="#3f60af" />
                    <Text style={styles.textChangePassword}>Cambiar Clave</Text>
                </Stack>
                <Input
                    style={styles.inputChangePassword}
                    placeholder="Nueva Clave"
                    borderRadius={30}
                ></Input>
                <Input
                    style={styles.inputChangePassword}
                    placeholder="Repetir Nueva Clave"
                    borderRadius={30}
                ></Input>
                <Input
                    style={styles.inputChangePassword}
                    placeholder="Clave Actual"
                    borderRadius={30}
                ></Input>
                <Button
                    startIcon={
                        <SimpleLineIcons name="lock" size={24} color="white" />
                    }
                    style={styles.buttonConfirmPassword}
                >
                    <Text style={styles.textConfirmPassword}>
                        Confirmar Nueva Clave
                    </Text>
                </Button>
            </Stack>
        </NativeBaseProvider>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    containerHeader: {
        minHeight: "7%",
        minWidth: "90%",
        borderRadius: 5,
        paddingHorizontal: 35,
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    textHeader: {
        fontSize: 19,
        fontWeight: "bold",
        color: "white",
    },
    containerChangePassword: {
        minHeight: "5%",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: 10,
    },
    textChangePassword: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: 10,
    },
    inputChangePassword: {
        minHeight: "7%",
        maxWidth: "85%",
        backgroundColor: "white",
        paddingLeft: 25,
    },
    buttonConfirmPassword: {
        borderRadius: 30,
        backgroundColor: "#00a54f",
        justifyContent: "flex-start",
        minHeight: "7%",
        minWidth: "85%",
    },
    textConfirmPassword: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
    },
});
