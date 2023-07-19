import loggedUser from "../objects/user";
import constants from "../constants/constants";

export const sendTokenNotification = async () => {
    console.log(loggedUser.user.idUser);
    console.log(loggedUser.user.token)

    await constants
        .AXIOS_INST({
            method: "post",
            url: "usuario/registrar/registrarToken",
            headers: {
                Authorization: `bearer ${loggedUser.user.token}`,
            },
            data: {
                device: {
                    token: loggedUser.user.tokenNotification,
                    idUsuario: loggedUser.user.idUser,
                },
            },
        })
        .then(() => {
            console.log("Token registrado");
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
            return;
        });
};
