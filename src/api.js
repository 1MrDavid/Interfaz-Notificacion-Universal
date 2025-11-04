import axios from "axios";

const API_URL = "http://localhost:8081/api/integrador/procesar";

export const enviarPeticion = async () => {
  try {
    const requestData = {
      cabecera: "GRCUNV001",
      datos: {
        "@CABECERA": "GRCUNV001",
        "@CANAL": "01",
        "@IP": "10.60.102.228",
        "@PAGINA": "000",
        "@TRACE": "0",
        "Cualquiera": "C"
      }
    };

    const response = await axios.post(API_URL, requestData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data; // Devuelve el JSON con la notificación
  } catch (error) {
    console.error("Error al procesar:", error);
    return null;
  }
};
