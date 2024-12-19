import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fechaOriginal) => {

    const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm", {
        locale: es,
    }).toUpperCase();

    return fechaFormateada;
};

export const formatearFechaPrestamo = (fechaOriginal) => {

    const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, yyyy", {
        locale: es,
    }).toUpperCase();

    return fechaFormateada;
};

export const sumarMeses = (fecha, meses) => {
    const nuevaFecha = new Date(fecha);
    const mesActual = nuevaFecha.getMonth();
    const añoActual = nuevaFecha.getFullYear();
    const nuevoMes = mesActual + parseInt(meses);
    const nuevoAño = añoActual + Math.floor(nuevoMes / 12);
    const mesAjustado = nuevoMes % 12;

    nuevaFecha.setFullYear(nuevoAño, mesAjustado);
    return nuevaFecha;
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
