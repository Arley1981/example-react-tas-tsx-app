
// Definir interfaz para una tarea (Task)
interface Task {
  id: number;
  title: string;
  description: string;
}



export const tasks : Task []= [
    {
      id: 0,
      title: "mi primer tarea",
      description: "ver tutorial",
    },
    {
      id: 1,
      title: "mi segunda tarea",
      description: "comprensión del código",
    },
    {
      id: 2,
      title: "mi tercer tarea",
      description: "Estructoración del proyecto",
    },
  ];