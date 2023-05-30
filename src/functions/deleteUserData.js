import AsyncStorage from "@react-native-async-storage/async-storage";
import loggedUser from "../objects/user";

export const deleteUserData = async () => {
    loggedUser.user.idUser = "";
    loggedUser.user.documentNumber = "";
    loggedUser.user.firstName = "";
    loggedUser.user.lastName = "";
    loggedUser.user.razonSocial = "";
    loggedUser.user.userName = "";
    loggedUser.user.email = "";
    loggedUser.user.numberPhone = "";
    loggedUser.user.phoneCompany.name = "";
    loggedUser.user.typeDocument.name = "";
    loggedUser.user.vehicles = [];
    loggedUser.user.token = "";
    loggedUser.user.balance = "";

    await AsyncStorage.multiRemove(["user", "loggedUser"])
        .then(() => console.log("Archivos eliminados"))
        .catch((e) => console.error(e));
};
