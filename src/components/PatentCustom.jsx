import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Center, Flex, HStack, NativeBaseProvider, Spacer, Stack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const PatentCustom = () => {
    return (
        <NativeBaseProvider>
            <Flex mb={4}>
                <Flex direction="row" justifyContent="center">
                    <Stack>
                        <Button
                            height={10}
                            minWidth="10%"
                            style={styles.button}
                            mt={2}
                            backgroundColor="#c3c1c4"
                            onPress={() => console.log("Boton presionado")}
                        >
                            <AntDesign
                                name="closecircleo"
                                size={20}
                                color="red"
                            />
                        </Button>
                    </Stack>
                    <Stack minW="75%">
                        <ImageBackground
                            source={require("../image/patente-argentina.png")}
                            resizeMode="stretch"
                            style={{ flex: 1, minHeight: 90 }}
                        >
                            <Center minH="100%" pt={4}>
                                <Text style={styles.textPatent}>AE538MQ</Text>
                            </Center>
                        </ImageBackground>
                    </Stack>
                </Flex>
                <HStack style={styles.containerParking} marginTop={1}>
                    <FontAwesome name="volume-up" size={24} color="black" />
                    <Spacer></Spacer>
                    <TouchableOpacity style={styles.playButton}>
                        <Text style={styles.textPlayButton}>Iniciar</Text>
                        <AntDesign name="play" size={30} color="white" />
                    </TouchableOpacity>
                    <Spacer></Spacer>
                    <TouchableOpacity
                        style={styles.stopButton}
                        onPress={() => console.log("Tocando el stop")}
                    >
                        <Text style={styles.textStopButton}>Parar</Text>
                        <FontAwesome5
                            name="stop-circle"
                            size={30}
                            color="#414141"
                        />
                    </TouchableOpacity>
                </HStack>
            </Flex>
        </NativeBaseProvider>
    );
};

export default PatentCustom;

const styles = StyleSheet.create({
    button: {
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
    },
    textPatent: {
        fontSize: 30,
        fontWeight: "bold",
    },
    containerParking: {
        minHeight: 50,
        minWidth: "85%",
        borderRadius: 30,
        paddingHorizontal: 20,
        backgroundColor: "#dbdcde",
        alignItems: "center",
    },
    playButton: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#01a254",
        alignItems: "center",
        minWidth: "20%",
    },
    stopButton: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#f4f3f1",
        alignItems: "center",
        minWidth: "20%",
    },
    textPlayButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        marginLeft: 16,
        marginRight: 20,
    },
    textStopButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#473a4b",
        marginLeft: 16,
        marginRight: 20,
    },
});
