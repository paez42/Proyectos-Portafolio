import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Tarea = ({ id, texto, completada, completarTarea, eliminarTarea }) => {
  return (
    <div
      className={
        completada
          ? "w-[500px] min-h-[65px] bg-purple-700 line-through my-1 mx-0 pt-2 pr-[15px] pb-2 pl-5 flex justify-between border cursor-pointer rounded-md items-center"
          : "w-[500px] min-h-[65px] bg-gray-900 my-1 mx-0 pt-2 pr-[15px] pb-2 pl-5 flex justify-between border cursor-pointer rounded-md items-center"
      }
    >
      <div
        className="w-full h-full text-xl flex [overflow-wrap:anywhere] items-center text-white select-none"
        onClick={() => completarTarea(id)}
      >
        {texto}
      </div>
      <div
        className="h-6 w-6 m-1  text-white text-2xl select-none"
        onClick={() => eliminarTarea(id)}
      >
        <AiOutlineCloseCircle />
      </div>
    </div>
  );
};

export default Tarea;
