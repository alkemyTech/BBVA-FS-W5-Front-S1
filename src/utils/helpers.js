import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fechaOriginal) => {

    const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm", {
        locale: es,
    }).toUpperCase();

    return fechaFormateada;
};

export const obtenerIniciales = (cadena) => {
    return cadena
      .split(" ")
      .filter((palabra) => palabra)
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join("");
  };

export const abreviarCBU = (cbu) => {
    return cbu.slice (0, 6) + "...";
}
