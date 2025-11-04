import NotificationCard from "./components/NotificationCard";
import "./App.css";

function App() {
  const notificacion = {
    codigo: "00",
    fecha: "20250821",
    hora: "1451",
    codigoMoneda: "VES",
    monto: "964.64",
    tipo: "P2C",
    objeto: {
      referenciaBancoOrigen: "0312969848",
      BancoOrigen: "0174",
      BancoDestino: "0151",
      numCliente: "+584241508060",
      CuentaOrigen: "00000000000000000000",
      CuentaDestino: "00000000000000000000",
      idComercio: "J315974134",
      concepto: ""
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", padding: "16px" }}>
      <NotificationCard data={notificacion} />
    </div>
  );
}

export default App;
