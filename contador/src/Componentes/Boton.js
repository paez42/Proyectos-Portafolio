function Boton({ texto, botonClic, manejarClic }) {
  return (
    <button
      className={
        botonClic
          ? " m-2.5 h-20 w-60 rounded-2xl border-2 border-solid border-white bg-green-500 px-6 py-3 font-bold text-white hover:bg-lime-300 "
          : "m-2.5 h-20 w-60 rounded-2xl border-2 border-solid border-white bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-teal-200"
      }
      onClick={manejarClic}
    >
      {texto}
    </button>
  );
}

export default Boton;
