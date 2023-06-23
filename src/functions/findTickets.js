import constants from "../constants/constants";
import loggedUser from "../objects/user";

export const findTickets = () => {
    loggedUser.user.tickets = []
    if (loggedUser.user.vehicles != []) {
        loggedUser.user.vehicles.forEach(async(vehicle) => {
            await constants.AXIOS_INST({
                method: "get",
                url: "ticket/mostrar",
                headers: {
                    Authorization: `bearer ${loggedUser.user.token}`,
                },
                data: {
                    ticket: {
                        patente: vehicle.patent,
                    },
                },
            }).then((resp) => {
                const listTickets = resp.data.mensaje
                if (listTickets != undefined) {
                    listTickets.forEach((ticket) => {
                        loggedUser.user.tickets.push({
                            id: ticket.idTicket,
                            patent: vehicle.patent,
                            amount: ticket.importe,
                        })
                    })
                }
            }).catch((error) => {
                console.log(error.response.data)
            })
        })
    }
       
}