import React, { useState } from "react";
import {v4 as uuidv4 } from "uuid";

const TareaFormulario = (props) => {
  const [input, setInput] = useState("");

  const manejarCambio = (e) => {
    setInput(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const tareaNueva = {
      id: uuidv4(),
      texto: input,
      completada: false
    };

    props.onSubmit(tareaNueva);
  };

  return (
    <form
      className="flex flex-wrap item-center justify-center"
      onSubmit={manejarEnvio}
    >
      <input
        className="w-[350px] text-lg bg-white pt-3.5 pr-8 pb-3.5 pl-[16px] rounded-tl-lg outline-none border-green-800 border-2 "
        type="text"
        placeholder="Escribe una Tarea"
        name="texto"
        onChange={manejarCambio}
      />
      <button className="p-4 text-lg border-none cursor-pointer outline-none rounded-rb-lg text-white capitalize bg-green-800">
        Agregar tarea
      </button>
    </form>
  );
};

export default TareaFormulario;
