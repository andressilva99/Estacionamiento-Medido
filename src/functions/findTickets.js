import constants from "../constants/constants";
import loggedUser from "../objects/user";

export const findTickets = () => {
    console.log(loggedUser.user.vehicles)
    loggedUser.user.tickets = [];
    if (loggedUser.user.vehicles != []) {
        loggedUser.user.vehicles.forEach(async (vehicle) => {
            await constants
                .AXIOS_INST({
                    method: "post",
                    url: "ticket/mostrar",
                    headers: {
                        Authorization: `bearer ${loggedUser.user.token}`,
                    },
                    data: {
                        ticket: {
                            patente: vehicle.patent,
                        },
                    },
                })
                .then((resp) => {
                    const listTickets = resp.data.mensaje;
                    if (listTickets != undefined) {
                        listTickets.forEach((ticket) => {
                            if (ticket.estado == 0) {
                                const dateString = ticket.fecha;
                                const dateObject = new Date(dateString);
                                const day = dateObject.getDate();
                                const month = dateObject.getMonth() + 1;
                                const year = dateObject.getFullYear();
                                const timeString = dateString.slice(11, 16);
                                const formattedDate = `${day}-${month}-${year} ${timeString}`;
                                loggedUser.user.tickets.push({
                                    id: ticket.idTicket,
                                    patent: vehicle.patent,
                                    amount: ticket.importe,
                                    date: formattedDate,
                                });
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });
    }
};
