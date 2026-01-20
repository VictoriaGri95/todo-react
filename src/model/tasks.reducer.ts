import type {TasksStateType, TaskType, TodolistType} from "../App.tsx";
import type {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";


export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type CreateTaskAT = ReturnType<typeof createTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type  ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

type ActionType =
  DeleteTodolistAT
  | CreateTodolistAT
  | DeleteTaskAT
  | CreateTaskAT
  | ChangeTaskTitleAT
  | ChangeTaskStatusAT

export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {

    case 'create_todolist': {
      const {id} = action.payload
      return {...tasks, [id]: []}
    }

    case "delete_todolist": {
      const {id} = action.payload
      const copyTasksState = {...tasks}
      delete copyTasksState[id]
      return copyTasksState
    }

    case 'delete_task': {
      const {id, todolistId} = action.payload
      const todolistTasks = tasks[todolistId] || []
      return {
        ...tasks,
        [todolistId]: todolistTasks.filter(task => task.id !== id)
      }
    }

    case 'create_task': {
      const {id, title, isDone, todolistId} = action.payload
      const newTask: TaskType = {id, title, isDone}
      const todolistTasks = tasks[todolistId] || []
      return {...tasks, [todolistId]: [newTask, ...todolistTasks]}
    }

    case 'change_task_title': {
      const {id, title, todolistId} = action.payload
      const todolistTasks = tasks[todolistId] || []
      return {
        ...tasks,
        [todolistId]: todolistTasks.map(task => task.id == id ? {
          ...task,
          title,
        } : task)
      }
    }

    case 'change_task_status': {
      const {id, isDone, todolistId} = action.payload
      const todolistTasks = tasks[todolistId] || []
      return {
        ...tasks,
        [todolistId]: todolistTasks.map(task => task.id == id ? {
          ...task,
          isDone
        } : task)
      }
    }


    default:
      return tasks
  }
}


export const deleteTaskAC = (payload: {
  id: TaskType['id'],
  todolistId: TodolistType['id']
}) => ({
  type: "delete_task",
  payload,
} as const)

export const createTaskAC = (payload: {
  title: TaskType['title'],
  todolistId: TodolistType['id']
}) => ({
  type: "create_task",
  payload: {
    ...payload,
    id: v1(),
    isDone: false,
  },
} as const)


export const changeTaskTitleAC = (payload: {
  title: TaskType['title'],
  todolistId: TodolistType['id'],
  id: TaskType['id']
}) => ({
  type: "change_task_title",
  payload,
} as const)


export const changeTaskStatusAC = (payload: {
  isDone: TaskType['isDone'],
  todolistId: TodolistType['id'],
  id: TaskType['id']
}) => ({
  type: "change_task_status",
  payload,
} as const)