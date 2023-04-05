import "./App.css";
import Boton from "./Componentes/Boton";
import Pantalla from "./Componentes/Pantalla";
import BotonClear from "./Componentes/BotonClear";
import { useState } from "react";
import { evaluate } from "mathjs";

function App() {

  const [input,setInput] = useState('');

  const agregarInput = val => {
    setInput(input + val);
    if (input.length > 16) {
      alert("No se pueden agregar mas de 15 caracteres!")
      setInput('');  
    }
  };

  const limpiarDatos = () => {
    setInput('');
  };

  const calcularResultado = () => {
    if (input){
      setInput(evaluate(input));
    } 
  };

  return (
    <div className="App flex h-screen flex-wrap items-center justify-center">
      <h1 className="mt-2 w-screen text-center text-[80px] text-white select-none">
        Proyecto Calculadora
      </h1>
      <div className="h-[600px] w-[400px] rounded-lg border-4 bg-green-400 p-3.5">
        <Pantalla input= {input} />
        <div className="m-1 flex items-center justify-center">
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>
        <div className="m-1 flex items-center justify-center">
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>
        <div className="m-1 flex items-center justify-center">
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>
        <div className="m-1 flex items-center justify-center">
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>
        <div className="m-1 flex items-center justify-center">
          <BotonClear manejarClear={limpiarDatos}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;
