const user = {
    idUser: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    razonSocial: "",
    email: "",
    numberPhone: "",
    phoneCompany: {
        idPhoneCompany: undefined,
        name: "",
    },
    typeDocument: {
        idTypeDocument: undefined,
        name: "",
    },
    vehicles: [],
    token: "",
    balance: "",
    password: "",
    tickets: [],
    tokenNotification: undefined,
    enableParking: true,
};

export default {
    user,
};
