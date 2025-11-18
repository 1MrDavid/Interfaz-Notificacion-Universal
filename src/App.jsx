import { useState, useEffect } from "react";
import NotificationCard from "./components/NotificationCard";
import { enviarPeticion } from "./api";
import "./App.css";

function App() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const manejarPeticion = async () => {
    setLoading(true);
    const respuesta = await enviarPeticion();
    setLoading(false);

    if (respuesta && respuesta.exito) {
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
          bancoOrigen: datos.bancoOrigen,
          bancoDestino: datos.bancoDestino,
          numCliente: datos.numCliente,
          cuentaOrigen: datos.cuentaOrigen,
          cuentaDestino: datos.cuentaDestino,
          idComercio: datos.idComercio,
          concepto: datos.concepto,
        },
      };

      setNotificaciones((prev) => [nuevaNotificacion, ...prev]);
    } else {
      alert("Error al obtener datos del servidor.");
    }
  };

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8081/api/v1/not/stream"
    );

    eventSource.onmessage = (event) => {
      try {
        const datos = JSON.parse(event.data);

        const nuevaNotificacion = {
          codigo: datos.codigo,
          fecha: datos.fecha,
          hora: datos.hora,
          codigoMoneda: datos.codigoMoneda,
          monto: datos.monto,
          tipo: datos.tipo,
          objeto: {
            referenciaBancoOrigen: datos.referenciaBancoOrigen,
            bancoOrigen: datos.bancoOrigen,
            bancoDestino: datos.bancoDestino,
            numCliente: datos.numCliente,
            cuentaOrigen: datos.cuentaOrigen,
            cuentaDestino: datos.cuentaDestino,
            idComercio: datos.idComercio,
            concepto: datos.concepto,
          },
        };

        setNotificaciones((prev) => [nuevaNotificacion, ...prev]);
      } catch (err) {
        console.error("Error procesando evento SSE:", err);
      }
    };

    eventSource.onerror = () => {
      console.error("❌ Error en SSE, reconectando...");
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">🏰 El castillo Informatico</div>
        <nav className="sidebar-menu">
          <a href="#" className="active">📩 Notificaciones</a>
          <a href="#">📊 Reportes</a>
          <a href="#">⚙️ Configuración</a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        <header className="header">
          <h1>Panel de Notificaciones</h1>
          <div className="user-info">
            <span className="user-name">Administrador</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="user-avatar"
            />
          </div>
        </header>

        <div className="content-area">
          <button
            onClick={manejarPeticion}
            disabled={loading}
            className="fetch-button"
          >
            {loading ? "Procesando..." : "Enviar Petición"}
          </button>

          <div className="notification-list">
            {notificaciones.length === 0 ? (
              <p className="empty-message">
                No hay notificaciones aún. Haz una petición para comenzar.
              </p>
            ) : (
              notificaciones.map((notif, index) => (
                <NotificationCard key={index} data={notif} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
