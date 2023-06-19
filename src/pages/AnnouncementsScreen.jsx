import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
    HStack,
    NativeBaseProvider,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import HeaderPage from "../components/HeaderPage";
import { ScaledSheet } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import loggedUser from "../objects/user"

const AnnouncementsScreen = ({navigation}) => {
    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    useEffect(() => {
        
        
    }, []);

    searchAnnouncements = async()=>{
        const config = {
            headers: {
                Authorization: `bearer ${loggedUser.user.token}`,
            },
            body: {
                ticket: {
                    fechaInicio: "2023-01-01",
                    patente: patent,
                },
            }
        };
    }

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <VStack
                space="sm"
                height="100%"
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <Feather
                        name="alert-circle"
                        style={styles.icon}
                        color="#3f60af"
                    />
                    <Text style={styles.textProfile}>Avisos</Text>
                </Stack>
                <Stack style={styles.containerWithoutAnnouncements}>
                    <Text style={styles.textWithoutAnnouncements}>No hay avisos</Text>
                </Stack>
                <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            </VStack>
        </NativeBaseProvider>
    );
};

export default AnnouncementsScreen;

const styles = ScaledSheet.create({
    background: {
        backgroundColor: "#f2f2f4",
    },
    containerProfile: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "3%",
    },
    icon: {
        fontSize: "25@ms",
    },
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
    containerWithoutAnnouncements: {
        borderRadius: "30@ms",
        backgroundColor: "white",
        borderColor: "red",
        borderWidth: "2@ms",
        minWidth: "85%",
        height: "45@ms",
        justifyContent: "center",
        paddingLeft: "30@ms",
    },
    textWithoutAnnouncements: {
        color: "red",
        fontSize: "23@ms",
        fontWeight: "bold",
    },
});
