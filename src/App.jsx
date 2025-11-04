import { useState } from "react";
import NotificationCard from "./components/NotificationCard";
import { enviarPeticion } from "./api";
import "./App.css";

function App() {
  const [notificacion, setNotificacion] = useState(null);
  const [loading, setLoading] = useState(false);

  const manejarPeticion = async () => {
    setLoading(true);
    const respuesta = await enviarPeticion();
    setLoading(false);

    if (respuesta && respuesta.exito) {
      // Adaptamos la estructura al formato que espera NotificationCard
      const datos = respuesta.datos;

      const nuevaNotificacion = {
        codigo: datos.codigo,
        fecha: datos.fecha.toString(),
        hora: datos.hora.toString(),
        codigoMoneda: datos.codigoMoneda || "VES",
        monto: datos.monto,
        tipo: datos.tipo,
        objeto: {
          referenciaBancoOrigen: datos.referenciaBancoOrigen,
          BancoOrigen: datos.BancoOrigen,
          BancoDestino: datos.BancoDestino,
          numCliente: datos.numCliente,
          CuentaOrigen: datos.CuentaOrigen,
          CuentaDestino: datos.CuentaDestino,
          idComercio: datos.idComercio,
          concepto: datos.concepto,
        },
      };

      setNotificacion(nuevaNotificacion);
    } else {
      alert("Error al obtener datos del servidor.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        padding: "16px",
      }}
    >
      <button
        onClick={manejarPeticion}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Cargando..." : "Enviar Petición"}
      </button>

      {notificacion && <NotificationCard data={notificacion} />}
    </div>
  );
}

export default App;
