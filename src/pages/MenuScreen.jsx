import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, NativeBaseProvider, Spacer, Stack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const MenuScreen = () => {
    return (
        <NativeBaseProvider>
            <Stack h="100%" p={5} style={styles.backgroundContainer}>
                <Stack style={styles.menuContainer}>
                    <Stack style={styles.buttonBorder} flexDirection="row" alignItems="center">
                        <Text style={styles.textButton}>Menú</Text>
                        <Spacer></Spacer>
                        <Button variant="ghost" w="20%">
                            <Feather name="menu" size={30} color="white" />
                        </Button>
                    </Stack>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <MaterialIcons
                                name="local-parking"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textButton}>
                            Estacionamiento Medido
                        </Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <Ionicons
                                name="person-circle-outline"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textButton}>Perfil</Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <FontAwesome5
                                name="history"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textButton}>Historial</Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <AntDesign
                                name="creditcard"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textButton}>Pago en línea</Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <AntDesign
                                name="exclamation"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textButton}>Avisos</Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <Feather name="map-pin" size={24} color="white" />
                        }
                    >
                        <Text style={styles.textButton}>Mapas</Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <Entypo name="info" size={24} color="white" />
                        }
                    >
                        <Text style={styles.textButton}>A cerca de</Text>
                    </Button>
                    <Button
                        variant="outline"
                        style={styles.buttonBorder}
                        startIcon={
                            <AntDesign
                                name="closecircleo"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textButton}>Cerrar</Text>
                    </Button>
                </Stack>
            </Stack>
        </NativeBaseProvider>
    );
};

export default MenuScreen;

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    menuContainer: {
        backgroundColor: "#3d61ad",
    },
    buttonBorder: {
        borderWidth: 3,
        borderColor: "#f2f2f4",
        borderRadius: 0,
        justifyContent: "flex-start",
    },
    textButton: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 8,
    },
});
