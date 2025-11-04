import { useState } from "react";
import NotificationCard from "./components/NotificationCard";
import { enviarPeticion } from "./api";
import "./App.css";

function App() {
  const [notificaciones, setNotificaciones] = useState([]); // ahora es un array
  const [loading, setLoading] = useState(false);

  const manejarPeticion = async () => {
    setLoading(true);
    const respuesta = await enviarPeticion();
    setLoading(false);

    if (respuesta && respuesta.exito) {
      const datos = respuesta.datos;

      // Estructura compatible con NotificationCard.jsx
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

      // 👇 Agrega la nueva notificación sin borrar las anteriores
      setNotificaciones((prev) => [nuevaNotificacion, ...prev]);
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
        justifyContent: "flex-start",
        backgroundColor: "#f3f4f6",
        padding: "32px",
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
          fontSize: "16px",
        }}
      >
        {loading ? "Cargando..." : "Enviar Petición"}
      </button>

      {/* Contenedor de tarjetas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {notificaciones.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No hay notificaciones aún
          </p>
        ) : (
          notificaciones.map((notif, index) => (
            <NotificationCard key={index} data={notif} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
