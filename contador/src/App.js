import "./App.css";
import Boton from "./Componentes/Boton";
import Contador from "./Componentes/Contador";
import { useState } from "react";

function App() {
  const [numClics, setNumClics] = useState(0);

  const manejarClic = () => {
    setNumClics(numClics + 1);
  };

  const reiniciarContador = () => {
    setNumClics(0);
  };

  return (
    <div className="App flex flex-wrap justify-center bg-gray-900">
      <h1 className="mt-2 w-screen select-none text-center text-[80px] text-white">
        Proyecto Contador
      </h1>
      <div className=" m-w-[600px] flex h-[700px] flex-col flex-wrap items-center justify-center">
        <Contador numClics={numClics} />
        <Boton texto="Clic" botonClic={true} manejarClic={manejarClic} />
        <Boton
          texto="Reiniciar"
          botonClic={false}
          manejarClic={reiniciarContador}
        />
      </div>
    </div>
  );
}

export default App;
