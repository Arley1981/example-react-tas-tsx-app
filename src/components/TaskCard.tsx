import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

// Definir la estructura o tipado de la tarea (task)
interface Task {
  id: number;
  title: string;
  description: string;
}

// Definir las props del componente TaskCard
interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  // obtener contexto
  const taskContext = useContext(TaskContext);

  // Verificar si el contexto es `undefined`
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  
  // Extraer deleteTask del contexto
  const { deleteTask } = taskContext;


  return (
    <div className="bg-gray-600 text-white p-4 rounded-md hover:bg-gray-400 hover:cursor-pointer max-w-sm mx-auto sm:max-w-full md:max-w-md">
      <h1 className="text-xl  md:text-2xl font-bold capitalize">
        {task.title}
      </h1>
      <p className="text-gray-300 text-xs sm:text-sm md:text-base">
        {task.description}
      </p>
      <button
        className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-300 w-full sm:w-auto"
        onClick={() => deleteTask(task.id)}
      >
        Eliminar tarea
      </button>
    </div>
  );
}

export default TaskCard;