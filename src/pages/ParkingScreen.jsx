import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
    Button,
    HStack,
    NativeBaseProvider,
    Spacer,
    Stack,
    VStack,
    Flex,
    Center,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const ParkingScreen = () => {
    return (
        <NativeBaseProvider>
            <VStack
                space="sm"
                height="100%"
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack style={styles.containerHeader}>
                    <FontAwesome5 name="parking" size={24} color="white" />
                    <Spacer></Spacer>
                    <Text style={styles.textHeader}>Estacionamiento medido</Text>
                    <Spacer></Spacer>
                    <Button variant="ghost">
                        <Feather name="menu" size={30} color="white"/>
                    </Button>
                </HStack>
                <VStack style={styles.containerUser}>
                    <Text style={styles.textName}>Apellido, nombre</Text>
                    <Text style={styles.textAccount}>Cuenta Nro: 42534</Text>
                </VStack>
                <HStack style={styles.containerBalance}>
                    <AntDesign name="wallet" size={24} color="#17974c" />
                    <Text style={styles.textBalance}>Saldo: $...</Text>
                </HStack>
                <Stack>
                    <Button
                        startIcon={
                            <FontAwesome5 name="car" size={24} color="white" />
                        }
                        style={styles.enterVehicleButton}
                    >
                        <Text style={styles.textEnterVehicle}>
                            Ingresar Nuevo Vehículo
                        </Text>
                    </Button>
                </Stack>
                <Stack>
                    <Button
                        startIcon={
                            <FontAwesome5 name="car" size={24} color="white" />
                        }
                        style={styles.parkingButton}
                        endIcon={
                            <FontAwesome
                                name="chevron-down"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textParkingVehicle}>
                            Estacionar
                        </Text>
                    </Button>
                </Stack>
                <ScrollView>
                    <Flex mb={4}>
                        <Flex direction="row" justifyContent="center">
                            <Stack>
                                <Button
                                    height={10}
                                    minWidth="10%"
                                    style={styles.button}
                                    mt={2}
                                    backgroundColor="#c3c1c4"
                                    onPress={() =>
                                        console.log("Boton presionado")
                                    }
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
                                        <Text style={styles.textPatent}>
                                            AE538MQ
                                        </Text>
                                    </Center>
                                </ImageBackground>
                            </Stack>
                        </Flex>
                        <HStack style={styles.containerParking} marginTop={1}>
                            <FontAwesome
                                name="volume-up"
                                size={24}
                                color="black"
                            />
                            <Spacer></Spacer>
                            <TouchableOpacity style={styles.playButton}>
                                <Text style={styles.textPlayButton}>
                                    Iniciar
                                </Text>
                                <AntDesign
                                    name="play"
                                    size={30}
                                    color="white"
                                />
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
                    <Flex mb={4}>
                        <Flex direction="row" justifyContent="center">
                            <Stack>
                                <Button
                                    height={10}
                                    minWidth="10%"
                                    style={styles.button}
                                    mt={2}
                                    backgroundColor="#c3c1c4"
                                    onPress={() =>
                                        console.log("Boton presionado")
                                    }
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
                                        <Text style={styles.textPatent}>
                                            AE538MQ
                                        </Text>
                                    </Center>
                                </ImageBackground>
                            </Stack>
                        </Flex>
                        <HStack style={styles.containerParking} marginTop={1}>
                            <FontAwesome
                                name="volume-up"
                                size={24}
                                color="black"
                            />
                            <Spacer></Spacer>
                            <TouchableOpacity style={styles.playButton}>
                                <Text style={styles.textPlayButton}>
                                    Iniciar
                                </Text>
                                <AntDesign
                                    name="play"
                                    size={30}
                                    color="white"
                                />
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
                    <Flex mb={4}>
                        <Flex direction="row" justifyContent="center">
                            <Stack>
                                <Button
                                    height={10}
                                    minWidth="10%"
                                    style={styles.button}
                                    mt={2}
                                    backgroundColor="#c3c1c4"
                                    onPress={() =>
                                        console.log("Boton presionado")
                                    }
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
                                        <Text style={styles.textPatent}>
                                            AE538MQ
                                        </Text>
                                    </Center>
                                </ImageBackground>
                            </Stack>
                        </Flex>
                        <HStack style={styles.containerParking} marginTop={1}>
                            <FontAwesome
                                name="volume-up"
                                size={24}
                                color="black"
                            />
                            <Spacer></Spacer>
                            <TouchableOpacity style={styles.playButton}>
                                <Text style={styles.textPlayButton}>
                                    Iniciar
                                </Text>
                                <AntDesign
                                    name="play"
                                    size={30}
                                    color="white"
                                />
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
                    <Flex mb={4}>
                        <Flex direction="row" justifyContent="center">
                            <Stack>
                                <Button
                                    height={10}
                                    minWidth="10%"
                                    style={styles.button}
                                    mt={2}
                                    backgroundColor="#c3c1c4"
                                    onPress={() =>
                                        console.log("Boton presionado")
                                    }
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
                                        <Text style={styles.textPatent}>
                                            AE538MQ
                                        </Text>
                                    </Center>
                                </ImageBackground>
                            </Stack>
                        </Flex>
                        <HStack style={styles.containerParking} marginTop={1}>
                            <FontAwesome
                                name="volume-up"
                                size={24}
                                color="black"
                            />
                            <Spacer></Spacer>
                            <TouchableOpacity style={styles.playButton}>
                                <Text style={styles.textPlayButton}>
                                    Iniciar
                                </Text>
                                <AntDesign
                                    name="play"
                                    size={30}
                                    color="white"
                                />
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
                </ScrollView>
            </VStack>
        </NativeBaseProvider>
    );
};

export default ParkingScreen;


const styles = StyleSheet.create({
    button: {
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
    },
    textPatent: {
        fontSize: 30,
        fontWeight: "bold",
    },
    containerHeader: {
        minHeight: "7%",
        minWidth: "90%",
        borderRadius: 5,
        paddingLeft: 20,
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    textHeader: {
        fontSize: 19,
        fontWeight: "bold",
        color: "white",
    },
    containerUser: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#c4e5f8",
    },
    containerBalance: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#f8f8f8",
        alignItems: "center",
    },
    containerParking: {
        minHeight: 50,
        minWidth: "85%",
        borderRadius: 30,
        paddingHorizontal: 20,
        backgroundColor: "#dbdcde",
        alignItems: "center",
    },
    textName: {
        fontWeight: "bold",
        fontSize: 21,
        color: "#4c75a1",
    },
    textAccount: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#5a7485",
    },
    textBalance: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#17974c",
        marginLeft: 15,
    },
    background: {
        backgroundColor: "#f2f2f4",
    },
    enterVehicleButton: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#77b5dc",
        justifyContent: "flex-start",
    },
    parkingButton: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#53be88",
        justifyContent: "flex-start",
    },
    textEnterVehicle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginLeft: 8,
    },
    textParkingVehicle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginLeft: 8,
        marginRight: 100,
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