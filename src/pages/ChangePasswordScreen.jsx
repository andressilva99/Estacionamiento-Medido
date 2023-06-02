import { StyleSheet, Text, Dimensions} from "react-native";
import React from "react";
import { Button, HStack, Input, NativeBaseProvider, Spacer, Stack, StatusBar } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import HeaderPage from "../components/HeaderPage";
import { ScaledSheet } from "react-native-size-matters";
import InputControlled from "../components/InputControlled";
import { useForm } from "react-hook-form";

const {height} = Dimensions.get("screen")

const ChangePasswordScreen = () => {
    const { control, handleSubmit, watch } = useForm();

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };
    return (
        <NativeBaseProvider>
        <StatusBar></StatusBar>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height={height}
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
                    <SimpleLineIcons name="lock" style={styles.icon} color="#3f60af" />
                    <Text style={styles.textChangePassword}>Cambiar Clave</Text>
                </Stack>
                <HStack maxW="85%">
                    <InputControlled
                    name="newPassword"
                    placeholder="Nueva Clave"
                    control={control}
                    width="85%"
                    // rules={}
                    >    
                    </InputControlled>
                </HStack>
                <HStack maxW="85%">
                    <InputControlled
                    name="repeatNewPassword"
                    placeholder="Repetir Nueva Clave"
                    control={control}
                    width="85%"
                    // rules={}
                    >    
                    </InputControlled>
                </HStack>
                <HStack maxW="85%">
                    <InputControlled
                    name="oldPassword"
                    placeholder="Clave Actual"
                    control={control}
                    width="85%"
                    // rules={}
                    >    
                    </InputControlled>
                </HStack>
                <Button
                    startIcon={
                        <SimpleLineIcons name="lock" style={styles.icon} color="white" />
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

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerChangePassword: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "10@ms",
    },
    textChangePassword: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "10@ms",
    },
    buttonConfirmPassword: {
        borderRadius: "30@ms",
        backgroundColor: "#00a54f",
        justifyContent: "flex-start",
        minHeight: "45@ms",
        minWidth: "85%",
    },
    textConfirmPassword: {
        color: "white",
        fontSize: "19@ms",
        fontWeight: "bold",
    },
    icon: {
        fontSize: "25@ms",
    },
});
