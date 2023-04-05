import React from "react";

function Boton(props) {
  const esOperador = (valor) => {
    return isNaN(valor) && valor !== "." && valor !== "=";
  };

  return (
    <div
      className={`m-2 flex h-20 flex-1 cursor-pointer select-none items-center justify-center rounded-lg border-2 bg-emerald-800 text-4xl font-bold text-white hover:ring-2 hover:bg-cyan-900
            ${esOperador(props.children) ? "bg-amber-600 hover:bg-amber-900 " : null}`.trimEnd()}
      onClick = {() => props.manejarClic(props.children)}
    >
      {props.children}
    </div>
  );
}

export default Boton;
