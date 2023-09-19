import { Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  HStack,
  KeyboardAvoidingView,
  NativeBaseProvider,
  Spacer,
  Spinner,
  Stack,
  StatusBar,
  VStack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import constants from "../constants/constants";
import EnterVehicleComboBox from "../components/EnterVehicleComboBox";
import InputControlled from "../components/InputControlled";
import { useForm } from "react-hook-form";
import loggedUser from "../objects/user";
import HeaderPage from "../components/HeaderPage";
import { saveUserInformation } from "../functions/saveUserInformation";
import AlertNotice from "../components/Alerts/AlertNotice";
import AlertError from "../components/Alerts/AlertError";
import { newEnterVehicle } from "../objects/newEnterVehicle";
import { FontAwesome } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

const EnterVehicleScreen = ({ navigation, route }) => {
  const { control, handleSubmit, watch } = useForm();

  const { refreshParkingScreen } = route.params;

  const [enableModel, setEnableModel] = useState(false);
  const [enableColor, setEnableColor] = useState(false);

  const [listMark, setListMark] = useState([]);
  const [enableButton, setEnableButton] = useState(false);

  const [listModel, setListModel] = useState([]);

  const [listColor, setListColor] = useState([]);

  const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
  const cancelRefAlertNotice = useRef(null);
  const onCloseAlertNotice = () => {
    setIsOpenAlertNotice(!isOpenAlertNotice);
    navigation.goBack();
  };
  const [messageAlertNotice, setMessageAlertNotice] = useState();

  const [isOpenAlertNoticeNoGoBack, setIsOpenAlertNoticeNoGoBack] = useState(false);
  const cancelRefAlertNoticeNoGoBack = useRef(null);
  const onCloseAlertNoticeNoGoBack = () => {
    setIsOpenAlertNoticeNoGoBack(!isOpenAlertNoticeNoGoBack);
  };
  const [messageAlertNoticeNoGoBack, setMessageAlertNoticeNoGoBack] = useState();
  
  const [isOpenAlertError, setIsOpenAlertError] = useState(false);
  const cancelRefAlertError = useRef(null);
  const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
  const [messageAlertError, setMessageAlertError] = useState();

  const [loading, setLoading] = useState(false);

  const [find, setFind] = useState(false);

  const [vehicleFind, setVehicleFind] = useState(false);

  const config = {
    headers: {
      Authorization: `bearer ${loggedUser.user.token}`,
    },
  };

  useEffect(() => {
    handleFocus();
    obtainMarks();
  }, []);

  const inputFocus = useRef(null);

  const handleFocus = () => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  };

  const obtainMarks = async () => {
    try {
      const result = await constants.AXIOS_INST.get("marcas", config);
      const marks = result.data.mensaje.map(({ idMarca, nombre }) => ({
        id: idMarca,
        title: nombre,
      }));
      setListMark(marks);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error);
      }
      return;
    }
  };

  const obtainModels = async () => {
    console.log("Y luego busco");
    try {
      if (newEnterVehicle.mark != null) {
        await constants.AXIOS_INST.get(
          `modelos/${newEnterVehicle.mark.id}`,
          config
        ).then(async (result) => {
          const models = result.data.mensaje.map(({ idModelo, nombre }) => ({
            id: idModelo,
            title: nombre,
          }));
          setListModel(models);
          listaModelos = models;
          setEnableModel(true);
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error);
      }
      setEnableModel(false);
      setEnableColor(false);
    }
  };

  const obtainColors = async () => {
    try {
      console.log("Y luego busco");
      const result = await constants.AXIOS_INST.get("colores", config);
      const colors = result.data.mensaje.map(({ idColor, nombre }) => ({
        id: idColor,
        title: nombre,
      }));
      setListColor(colors);
      setEnableColor(true);
      listaColores = colors;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error);
      }
      setEnableColor(false);
    }
  };

  const EnableModel = () => {
    setEnableModel(false);
    setEnableColor(false);
    obtainModels();
  };

  const EnableColor = () => {
    setEnableColor(false);
    obtainColors();
  };

  const findPatent = async (data) => {
    setFind(true);
    await constants.AXIOS_INST.get(`vehiculo/${data.patent}`, config)
      .then(async (response) => {
        console.log(response.data.mensaje);
        msj = response.data.mensaje;
        if (msj.existe) {
          await completeData(
            msj.vehiculo.idMarca,
            msj.vehiculo.idModelo,
            msj.vehiculo.idColor
          );
          setMessageAlertNoticeNoGoBack(
            `Se encontró un vehículo previamente registrado:\n\n- Patente: ${data.patent}\n- Marca: ${newEnterVehicle.mark.title}\n- Modelo: ${newEnterVehicle.model.title}\n- Color: ${newEnterVehicle.color.title}`
          );
          setIsOpenAlertNoticeNoGoBack(true);
          setEnableButton(true);
        } else {
          newEnterVehicle.mark = null;
          newEnterVehicle.model = null;
          newEnterVehicle.color = null;
          setEnableModel(false);
          setEnableColor(false);
          setEnableButton(false);
          setMessageAlertNoticeNoGoBack(`No se encontró ningún vehículo registrado con patente ${data.patent}. Por favor registre los datos de su vehículo.`);
          setIsOpenAlertNoticeNoGoBack(true);
        }
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
    setVehicleFind(true);
    setFind(false);
  };

  let listaModelos = [];
  let listaColores = [];

  const completeData = async (tempIdMark, tempIdModel, tempIdColor) => {
    let tempMark = listMark.find((mark) => mark.id === tempIdMark);
    newEnterVehicle.mark = tempMark;
    await obtainModels();
    let tempModel = listaModelos.find((model) => model.id === tempIdModel);
    newEnterVehicle.model = tempModel;
    await obtainColors();
    let tempColor = listaColores.find((color) => color.id === tempIdColor);
    newEnterVehicle.color = tempColor;
  };

  const RegisterVehicle = async (data) => {
    setLoading(true);
    const { patent } = data;
    const vehicleRegister = {
      vehiculo: {
        patente: patent,
        idUsuario: loggedUser.user.idUser,
        idMarca: newEnterVehicle.mark.id,
        idModelo: newEnterVehicle.model.id,
        idColor: newEnterVehicle.color.id,
      },
    };

    await constants.AXIOS_INST.post(
      "vehiculo/registrar",
      vehicleRegister,
      config
    )
      .then((response) => {
        saveVehicle(response.data.mensaje);
        setMessageAlertNotice("Vehículo registrado");
        setIsOpenAlertNotice(true);
        refreshParkingScreen();
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
    setLoading(false);
  };

  const saveVehicle = (vehicle) => {
    vehicle.forEach((veh) => {
      loggedUser.user.vehicles.push({
        mark: veh.idMarca,
        model: veh.idModelo,
        patent: veh.patente,
        color: veh.idColor,
        idVehicle: veh.idVehiculo,
        parked: false,
      });
    });
    console.log(loggedUser.user.vehicles);
    saveUserInformation();
  };

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={"default"} backgroundColor={"black"}></StatusBar>
      <Stack
        style={styles.backgroundContainer}
        space="sm"
        height={height}
        alignItems="center"
        safeAreaTop={true}
      >
        <HStack>
          <HeaderPage
            dissableButtonMenu={true}
            navigation={navigation}
          ></HeaderPage>
        </HStack>
        <Stack flexDirection="row" style={styles.containerProfile}>
          <FontAwesome5 name="car" size={24} color="#3f60af" />
          <Text style={styles.textProfile}>Ingresar Nuevo Vehículo</Text>
        </Stack>
        <HStack maxW="85%">
          <InputControlled
            name="patent"
            control={control}
            autoCapitalize="characters"
            placeholder="Patente"
            rules={{
              required: " Patente Requerida",
              pattern: {
                value: /^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/,
                message:
                  ' La patente debe tener el formato "LLLNNN" o "LLNNNLL" (L: letra, N: número)',
              },
            }}
            inputFocus={inputFocus}
          ></InputControlled>
        </HStack>
        <Stack maxW={"85%"}>
          <Text>*Formato ej.: "ABC123", "AB123CD"</Text>
        </Stack>
        <Stack maxW={"85%"}>
          {find ? (
            <Button
              isLoading
              style={styles.buttonFindPatent}
              onPress={handleSubmit(findPatent)}
              isLoadingText={
                <HStack space={"lg"}>
                  <Text style={styles.textButton}>Buscando Patente</Text>
                  <Spinner size={"sm"} color={"white"}></Spinner>
                </HStack>
              }
              spinnerPlacement="none"
            ></Button>
          ) : (
            <Button
              style={styles.buttonFindPatent}
              onPress={handleSubmit(async (data) => await findPatent(data))}
            >
              <HStack space={"lg"}>
                <Text style={styles.textButton}>Buscar Patente</Text>
                <FontAwesome name="search" style={styles.icon} />
              </HStack>
            </Button>
          )}
        </Stack>
        <Stack minW={"85%"} borderBottomWidth={3}></Stack>
        {find ? (
          <HStack space={"lg"} height={"10%"} alignItems={"center"}>
            <Text style={styles.textObtainData}>Obteniendo datos</Text>
            <Spinner color={"#515ba3"} size={"lg"}></Spinner>
          </HStack>
        ) : vehicleFind ? (
          <VStack space={"sm"}>
            <HStack style={styles.containerEnabled} maxW={"85%"}>
              <HStack flex={2} alignItems="center">
                <Text style={styles.label}>Marca</Text>
                <Spacer></Spacer>
                <Text style={styles.slash}>l</Text>
              </HStack>
              <Stack flex={4}>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => {
                    setEnableButton(false);
                    navigation.navigate("VehicleProperty", {
                      type: "mark",
                      listElement: listMark,
                      label: "Marca",
                      onBlur: () => {
                        EnableModel();
                      },
                      enable: true,
                      onClear: () => {
                        setEnableModel(false);
                        setEnableColor(false);
                      },
                    });
                  }}
                >
                  <Text style={styles.touchableOpacityLabel}>
                    {newEnterVehicle.mark != null
                      ? newEnterVehicle.mark.title
                      : "Seleccionar Marca"}
                  </Text>
                </TouchableOpacity>
              </Stack>
            </HStack>
            {enableModel ? (
              <HStack style={styles.containerEnabled} maxW={"85%"}>
                <HStack flex={2} alignItems="center">
                  <Text style={styles.label}>Modelo</Text>
                  <Spacer></Spacer>
                  <Text style={styles.slash}>l</Text>
                </HStack>
                <Stack flex={4}>
                  <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => {
                      setEnableButton(false);
                      navigation.navigate("VehicleProperty", {
                        type: "model",
                        listElement: listModel,
                        label: "Modelo",
                        onBlur: () => {
                          EnableColor();
                        },
                        enable: true,
                        onClear: () => {
                          setEnableColor(false);
                        },
                      });
                    }}
                  >
                    <Text style={styles.touchableOpacityLabel}>
                      {newEnterVehicle.model != null
                        ? newEnterVehicle.model.title
                        : "Seleccionar Modelo"}
                    </Text>
                  </TouchableOpacity>
                </Stack>
              </HStack>
            ) : (
              <HStack style={styles.containerDisabled} maxW={"85%"}>
                <HStack flex={2} alignItems="center">
                  <Text style={styles.label}>Modelo</Text>
                  <Spacer></Spacer>
                  <Text style={styles.slash}>l</Text>
                </HStack>
                <Stack flex={4}></Stack>
              </HStack>
            )}
            {enableColor ? (
              <HStack style={styles.containerEnabled} maxW={"85%"}>
                <HStack flex={2} alignItems="center">
                  <Text style={styles.label}>Color</Text>
                  <Spacer></Spacer>
                  <Text style={styles.slash}>l</Text>
                </HStack>
                <Stack flex={4}>
                  <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => {
                      setEnableButton(false);
                      navigation.navigate("VehicleProperty", {
                        type: "color",
                        listElement: listColor,
                        label: "Color",
                        onBlur: () => {
                          setEnableButton(true);
                        },
                        enable: true,
                        onClear: () => {},
                      });
                    }}
                  >
                    <Text style={styles.touchableOpacityLabel}>
                      {newEnterVehicle.color != null
                        ? newEnterVehicle.color.title
                        : "Seleccionar Color"}
                    </Text>
                  </TouchableOpacity>
                </Stack>
              </HStack>
            ) : (
              <HStack style={styles.containerDisabled} maxW={"85%"}>
                <HStack flex={2} alignItems="center">
                  <Text style={styles.label}>Color</Text>
                  <Spacer></Spacer>
                  <Text style={styles.slash}>l</Text>
                </HStack>
                <Stack flex={4}></Stack>
              </HStack>
            )}
            {loading ? (
              <Button
                isLoading
                isLoadingText={
                  <Text style={styles.textButton}>Ingresando vehículo</Text>
                }
                style={styles.button}
                spinnerPlacement="end"
              ></Button>
            ) : (
              <Button
                isDisabled={!enableButton}
                onPress={handleSubmit(RegisterVehicle)}
                style={styles.button}
              >
                <Text style={styles.textButton}>Ingresar vehículo</Text>
              </Button>
            )}
          </VStack>
        ) : null}
      </Stack>
      <AlertNotice
        isOpen={isOpenAlertNotice}
        onClose={onCloseAlertNotice}
        message={messageAlertNotice}
        cancelRef={cancelRefAlertNotice}
      ></AlertNotice>
      <AlertNotice
        isOpen={isOpenAlertNoticeNoGoBack}
        onClose={onCloseAlertNoticeNoGoBack}
        message={messageAlertNoticeNoGoBack}
        cancelRef={cancelRefAlertNoticeNoGoBack}
      ></AlertNotice>
      <AlertError
        isOpen={isOpenAlertError}
        onClose={onCloseAlertError}
        message={messageAlertError}
        cancelRef={cancelRefAlertError}
      ></AlertError>
    </NativeBaseProvider>
  );
};

export default EnterVehicleScreen;

const styles = ScaledSheet.create({
  backgroundContainer: {
    backgroundColor: "#f2f2f4",
  },
  containerProfile: {
    minHeight: "45@ms",
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
  button: {
    backgroundColor: "#51be85",
    borderRadius: "30@ms",
    minHeight: "45@ms",
    minWidth: "85%",
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
    fontSize: "18@ms",
  },
  textNote: {
    color: "#414241",
  },
  containerEnabled: {
    minHeight: "45@ms",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "30@ms",
    borderColor: "#9d9ca1",
    borderWidth: "1@ms",
  },
  label: {
    fontSize: "18@ms",
    color: "#656a6e",
    marginLeft: "15@ms",
  },
  slash: {
    fontSize: "30@ms",
    color: "#656a6e",
    fontWeight: "bold",
  },
  containerDisabled: {
    minHeight: "45@ms",
    alignItems: "center",
    backgroundColor: "#eaeaec",
    borderRadius: "30@ms",
    borderColor: "#9d9ca1",
    borderWidth: "1@ms",
  },
  touchableOpacity: {
    alignItems: "center",
  },
  touchableOpacityLabel: {
    fontSize: "18@ms",
    color: "#656a6e",
  },
  buttonFindPatent: {
    borderRadius: "30@ms",
    height: "45@ms",
    backgroundColor: "#515ba3",
    minWidth: "100%",
  },
  icon: {
    color: "white",
    fontSize: "24@ms",
  },
  textObtainData: {
    fontSize: "17@ms",
    color: "#515ba3",
    fontWeight: "bold",
  },
});
