import AsyncStorage from "@react-native-async-storage/async-storage";
import loggedUser from "../objects/user";

export const saveUserInformation = async () => {
    await AsyncStorage.setItem("user", JSON.stringify(loggedUser))
        .then(() => console.log("Datos del ususario guardados"))
        .catch((e) => console.error(e));
};
