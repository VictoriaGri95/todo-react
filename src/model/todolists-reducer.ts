import type {FilterValuesType, TodolistType} from "../App.tsx";
import {v1} from "uuid";


export type DeleteTodolistAT = {
  type: "delete_todolist";
  payload: {
    id: TodolistType['id'];
  }
}

export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

export type ActionType =
  DeleteTodolistAT
  | CreateTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT


//чистая функция: идемпотентность, детерминированность и Отсутствие побочных эффектов
export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {

  switch (action.type) {
    case "delete_todolist": {
      const {id} = action.payload
      return todolists.filter(todolist => todolist.id !== id);
    }

    case "create_todolist": {
      const {title, id} = action.payload
      const newTodolist: TodolistType = {
        id,
        title,
        filter: 'All'
      }
      return [...todolists, newTodolist]
    }

    case "change_todolist_title": {
      const {id, title} = action.payload
      return todolists.map(todolist => todolist.id === id ? {
        ...todolist,
        title
      } : todolist)
    }

    case "change_todolist_filter": {
      const {id, filter} = action.payload
      return todolists.map(todolist => todolist.id === id ? {
        ...todolist,
        filter
      } : todolist)
    }

    default:
      return todolists;
  }
}


export const deleteTodolistAC = (id: TodolistType['id']): DeleteTodolistAT => {
  return {
    type: "delete_todolist",
    payload: {
      id,
    }
  }
}

export const createTodolistAC = (title: TodolistType["title"]) => {
  return {
    type: "create_todolist",
    payload: {
      title,
      id: v1()
    }
  } as const
}

export const changeTodolistTitleAC = (payload: {
  id: TodolistType['id'],
  title: TodolistType["title"]
}) => ({
  type: "change_todolist_title",
  payload,
} as const)

export const changeTodolistFilterAC = (payload: {
  id: TodolistType['id'],
  filter: FilterValuesType
}) => ({
  type: "change_todolist_filter",
  payload,
} as const)
