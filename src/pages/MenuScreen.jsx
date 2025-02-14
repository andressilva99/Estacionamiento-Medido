import { Dimensions, ImageBackground, Linking, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    HStack,
    NativeBaseProvider,
    Spacer,
    VStack,
    Image,
    ScrollView,
} from "native-base";
import PressableCustom from "../components/PressableCustom";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";
import { deleteUserData } from "../functions/deleteUserData";
import AlertNoticeFunction from "../components/Alerts/AlertNoticeFunction";
import AlertError from "../components/Alerts/AlertError";
import loggedUser from "../objects/user";
import HeaderButtonGoBack from "../components/HeaderButtonGoBack";

const { height } = Dimensions.get("screen");

const MenuScreen = ({ navigation, route }) => {
    const [subMenu, setSubMenu] = useState(false);
    const { setLogged, refreshParkingScreen } = route.params;

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const handleButtonPress = (id) => {
        switch (id) {
            case "logOut":
                setIsOpenAlertNoticeFunction(true);
                break;
            case "PaymentLink":
                Linking.openURL(loggedUser.user.paymentLink);
                break;
            default:
                navigation.navigate(id, { refreshParkingScreen });
                setSubMenu(false);
                break;
        }
    };

    const logOut = async () => {
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
    };

    return (
        <NativeBaseProvider>
            <StatusBar
                barStyle={"default"}
                backgroundColor={"black"}
            ></StatusBar>
            <ImageBackground
                source={constants.BACKGROUND_INIT}
                resizeMode="stretch"
            >
                <VStack safeAreaTop={true}>
                    <HeaderButtonGoBack
                        navigation={navigation}
                    ></HeaderButtonGoBack>
                    <ScrollView
                        height={height}
                        showsVerticalScrollIndicator={false}
                    >
                        <VStack style={styles.backgroundContainer} space="sm">
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Menú"}
                                    icon={constants.MENU_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#009FE3",
                                    }}
                                    iconRight={true}
                                    styleText={styles.textMenu}
                                    disabled={true}
                                ></PressableCustom>
                            </HStack>
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Estacionamiento Medido"}
                                    icon={constants.PARKING_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#086EC1",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"Parking"}
                                ></PressableCustom>
                            </HStack>
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Perfil"}
                                    icon={constants.PROFILE_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#05509C",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"Profile"}
                                ></PressableCustom>
                            </HStack>
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Historial"}
                                    icon={constants.HISTORY_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#009FE3",
                                    }}
                                    onPress={() => setSubMenu(!subMenu)}
                                    id={"History"}
                                ></PressableCustom>
                            </HStack>
                            {subMenu ? (
                                <>
                                    <HStack style={styles.containerPressable}>
                                        <PressableCustom
                                            text={"Estacionamientos"}
                                            icon={
                                                constants.PARKING_HISTORY_ICON
                                            }
                                            styleTouchable={
                                                styles.touchableSubMenu
                                            }
                                            onPress={handleButtonPress}
                                            id={"ParkingHistory"}
                                        ></PressableCustom>
                                    </HStack>
                                    <HStack style={styles.containerPressable}>
                                        <PressableCustom
                                            text={"Recargas"}
                                            icon={constants.RECHARGES_ICON}
                                            styleTouchable={
                                                styles.touchableSubMenu
                                            }
                                            onPress={handleButtonPress}
                                            id={"RechargesHistory"}
                                        ></PressableCustom>
                                    </HStack>
                                    <HStack style={styles.containerPressable}>
                                        <PressableCustom
                                            text={"Movimientos"}
                                            icon={constants.MOVEMENTS_ICON}
                                            styleTouchable={
                                                styles.touchableSubMenu
                                            }
                                            onPress={handleButtonPress}
                                            id={"MovementsHistory"}
                                        ></PressableCustom>
                                    </HStack>
                                    <HStack style={styles.containerPressable}>
                                        <PressableCustom
                                            text={"Avisos"}
                                            icon={constants.NOTICE_ICON}
                                            styleTouchable={
                                                styles.touchableSubMenu
                                            }
                                            onPress={handleButtonPress}
                                            id={"AnnouncementsHistory"}
                                        ></PressableCustom>
                                    </HStack>
                                </>
                            ) : null}
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Pago en línea"}
                                    icon={constants.CREDIT_CARD_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#086EC1",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"PaymentLink"}
                                ></PressableCustom>
                            </HStack>
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Avisos"}
                                    icon={constants.NOTICE_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#05509C",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"Announcements"}
                                ></PressableCustom>
                            </HStack>
                            {/* <HStack style={styles.containerPressable}>
                            <PressableCustom
                                text={"Mapas"}
                                icon={constants.MAP_ICON}
                                styleTouchable={{ backgroundColor: "#009FE3" }}
                                //En desarrollo
                                disabled={true}
                            ></PressableCustom>
                        </HStack> */}
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Acerca de"}
                                    icon={constants.INFORMATION_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#009FE3",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"Information"}
                                ></PressableCustom>
                            </HStack>
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Eliminar patente"}
                                    icon={constants.DELETE_PATENT_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#086EC1",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"DeletePatent"}
                                ></PressableCustom>
                            </HStack>
                            <HStack style={styles.containerPressable}>
                                <PressableCustom
                                    text={"Cerrar sesión"}
                                    icon={constants.CLOSE_ICON}
                                    styleTouchable={{
                                        backgroundColor: "#05509C",
                                    }}
                                    onPress={handleButtonPress}
                                    id={"logOut"}
                                ></PressableCustom>
                            </HStack>
                            <Image
                                source={constants.LOGO}
                                alt="logo-app"
                                resizeMode="contain"
                                style={styles.imageLogo}
                            ></Image>
                            <Spacer></Spacer>
                        </VStack>
                    </ScrollView>
                </VStack>
            </ImageBackground>
            <AlertNoticeFunction
                isOpen={isOpenAlertNoticeFunction}
                cancelRef={cancelRefAlertNoticeFunction}
                onClose={onCloseAlertNoticeFunction}
                message={"¿Está seguro que desea Cerrar Sesión?"}
                onPressAccept={logOut}
            ></AlertNoticeFunction>
            <AlertError
                isOpen={isOpenAlertError}
                onClose={onCloseAlertError}
                message={messageAlertError}
                cancelRef={cancelRefAlertError}
            ></AlertError>
        </NativeBaseProvider>
    );
};

export default MenuScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        alignItems: "center",
        paddingBottom: "70@ms",
    },
    containerPressable: {
        minWidth: "100%",
    },
    buttonBorder: {
        borderWidth: 3,
        borderColor: "#f2f2f4",
        borderRadius: 0,
        justifyContent: "flex-start",
    },
    textButton: {
        color: "white",
        fontSize: "20@ms",
        fontWeight: "bold",
        paddingLeft: "8@ms",
    },
    textMenu: {
        fontWeight: "bold",
        fontSize: "24@ms",
    },
    touchableSubMenu: {
        backgroundColor: "#949599",
        paddingLeft: "50@ms",
    },
    imageLogo: {
        width: "200@ms",
        height: "80@ms",
        marginBottom: "40@ms",
        marginTop: "40@ms",
    },
});
