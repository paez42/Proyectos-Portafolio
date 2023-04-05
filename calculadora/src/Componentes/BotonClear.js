import React from "react";

const BotonClear = (props) => {
  return (
    <div
      className="flex h-16 flex-1 cursor-pointer select-none items-center justify-center rounded-lg border-2 border-solid bg-red-300 text-2xl font-bold text-white ring-2 hover:bg-red-500 hover:ring-red-400"
      onClick={props.manejarClear}
    >
      {props.children}
    </div>
  );
};

export default BotonClear;
