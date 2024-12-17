import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fechaOriginal) => {

    const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm", {
        locale: es,
    }).toUpperCase();

    return fechaFormateada;
};