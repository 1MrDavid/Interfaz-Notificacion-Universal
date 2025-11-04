import React from "react";

const Notification = ({ data }) => {
  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-700 mb-2">📢 Notificación</h2>
      <p><strong>Fecha:</strong> {data.fecha}</p>
      <p><strong>Hora:</strong> {data.hora}</p>
      <p><strong>Tipo:</strong> {data.tipo}</p>
      <p><strong>Cuenta Origen:</strong> {data.CuentaOrigen}</p>
      <p><strong>Cuenta Destino:</strong> {data.CuentaDestino}</p>
      <p><strong>Monto:</strong> {data.monto}</p>
      <p><strong>Concepto:</strong> {data.concepto}</p>
      <p><strong>Cliente:</strong> {data.numCliente}</p>
    </div>
  );
};

export default Notification;
