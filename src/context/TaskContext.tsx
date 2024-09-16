import { createContext, useState, useEffect, ReactNode } from "react";
import { tasks as data } from "../data/tasks";
import Toastify from 'toastify-js';

// ==Definir la estructura o tipado de una tarea (Task)==//
interface Task {
  id: number;
  title: string;
  description: string;
}

// == Definir el tipo del contexto==/
interface TaskContextType {
  tasks: Task[];
  deleteTask: (id: number) => void;
  createTask: (task: Omit<Task, 'id'>) => void;
}

// == Crear el contexto tipado == //
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// ==Definir las props para el TaskContextProvider==//
interface TaskContextProviderProps {
  children: ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  //==Función crear tarea==//
  function createTask(task: Omit<Task, 'id'>) {
    const newTask = {
      title: task.title,
      id: tasks.length,
      description: task.description,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }
  

  //==Función eliminar tarea==//
  function deleteTask(taskId: number) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks)
    
    //==  Notificación de tarea eliminada o todas las tareas eliminadas ==//
    Toastify({
      text: updatedTasks.length === 0 ? 'Todas las tareas eliminadas' : 'Tarea Eliminada',
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
  

   useEffect(() => {
    setTasks(data);
  }, []); 

  //==Recuperar las tareas desde localStorage (o usar data si no hay)==//
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Si hay tareas en localStorage, las usamos
    } else {
      setTasks(data); // ==Si no hay tareas, usamos las predeterminadas de data ==//
    }
  }, []);

  
  //==Guardar las tareas en localStorage cada vez que cambian==//
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); 
    } 
  }, [tasks]);
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}