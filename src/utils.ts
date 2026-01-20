import type {TaskType} from "./TodolistItem.tsx";
import type {FilterValuesType} from "./App.tsx";


export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType) => {
  if (!tasks) {
    return []
  }

  switch (filter) {
    case "Active":
      return tasks.filter(task => !task.isDone)
    case "Completed":
      return tasks.filter(task => task.isDone)
    default:
      return tasks;
  }
}
