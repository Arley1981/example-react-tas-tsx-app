import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
  // == Obtener el contexto== //
  const taskContext = useContext(TaskContext);

  // == Verificar si el contexto es `undefined`==//
  if (!taskContext) {
    throw new Error("TaskContext debe usarse dentro de un TaskContextProvider");
  }

  //==Extraer las tareas del contexto==//
  const { tasks } = taskContext;

  // ==Mostrar mensaje si no hay tareas==//
  if (tasks.length === 0) {
    return <h1 className="text-white text-4xl font-bold text-center">No hay tareas aún</h1>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2  ">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;

