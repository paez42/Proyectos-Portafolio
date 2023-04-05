import "./App.css";
import ListaTareas from "./Components/ListaTareas";

function App() {
  return (
    <div className="App flex h-screen flex-wrap items-center justify-center">
      <h1 className="text-white text-7xl w-full text-center select-none">
        Proyecto App de Tareas
      </h1>
      <div className="w-[600px] min-h-[500px] bg-slate-300 p-6  rounded-md m-2.5 ">
        <h1 className="text-gray-900 text-center text-2xl my-5 mx-0 font-bold select-none ">
           Mis Tareas
        </h1>
        <ListaTareas />
      </div>
    </div>
  );
}

export default App;
