import { useState, useContext, FormEvent } from "react";
import { TaskContext } from "../context/TaskContext";
import Toastify from 'toastify-js';

function TaskForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // == obtener el contexto ==//
  const taskContext = useContext(TaskContext);

  // Verificar si el contexto es `undefined`
  if (!taskContext) {
    throw new Error("TaskContext debe usarse dentro de un TaskContextProvider");
  }

  // Extraer createTask del contexto
  const { createTask } = taskContext;


  // Función para manejar el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Llamar a createTask con los datos del formulario
    createTask({
      title,
      description,
    });

    Toastify({
      text: 'Tarea Guardada',
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

    // Limpiar los campos del formulario
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-sm mx-auto sm:max-w-md md:max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-green-300  hover:bg-green-400 p-6 sm:p-8 md:p-10 mb-4 rounded-md"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 text-center">
          Crear Tarea
        </h1>
        <input
          placeholder="Escribe tu tarea"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="bg-slate-100 p-3 w-full mb-2"
          autoFocus
        />
        <textarea
          placeholder="Ecribe la descripción de la tarea"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="bg-slate-100 p-3 w-full mb-2"
        ></textarea>
        <button className="bg-green-800 px-3 py-1 sm:py-2 sm:px-4 text-white hover:bg-green-200 rounded-md w-full sm:w-auto">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;