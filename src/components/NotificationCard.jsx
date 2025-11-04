import React from "react";
import "./NotificationCard.css";

const NotificationCard = ({ data }) => {
  if (!data) return null;

  const {
    codigo,
    fecha,
    hora,
    codigoMoneda,
    monto,
    tipo,
    objeto
  } = data;

  return (
    <div className="notification-card">
      <div className="notification-header">
        <span className="notification-date">
          {fecha} • {hora.slice(0, 2)}:{hora.slice(2)}
        </span>
        <span className={`notification-type ${tipo === "P2C" ? "p2c" : "other"}`}>
          {tipo}
        </span>
      </div>

      <div className="mb-3">
        <p className="notification-amount">
          {codigoMoneda} {monto}
        </p>
        <p className="notification-code">Código: {codigo}</p>
      </div>

      <div className="notification-body">
        <p><span>Banco Origen:</span> {objeto.BancoOrigen}</p>
        <p><span>Banco Destino:</span> {objeto.BancoDestino}</p>
        <p><span>Cliente:</span> {objeto.numCliente}</p>
        <p><span>Comercio:</span> {objeto.idComercio}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
