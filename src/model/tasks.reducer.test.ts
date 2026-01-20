import {beforeEach, expect, test} from 'vitest'
import type {TasksStateType} from '../App'
import {
  createTodolistAC,
  deleteTodolistAC,
} from "./todolists-reducer.ts";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer
} from "./tasks.reducer.ts";

let startState: TasksStateType = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    todolistId2: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(startState, createTodolistAC('New todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
  // or
  expect(endState['todolistId2']).toBeUndefined()
})


test('correct task should be deleted from correct todolist', () => {

  const action = deleteTaskAC({todolistId: 'todolistId1', id: '2'})

  const endState = tasksReducer(startState, action)

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется две таски
  expect(endState['todolistId1'].length).toBe(2)
  // удалится нужная таска, не любая
  expect(endState['todolistId1'][0].id).toBe('1')
  expect(endState['todolistId1'][1].id).toBe('3')

  // todolistId2 остался без изменений
  expect(endState['todolistId2']).toEqual(startState['todolistId2'])
})


test('correct task should be created', () => {

  const title = 'New task'

  const endState = tasksReducer(startState, createTaskAC({
    todolistId: 'todolistId1',
    title
  }))

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId1'][0].title).toBe(title)

  // 4.2. В todolistId2 должно остаться 2 задачи (без изменений)
  expect(endState['todolistId2'].length).toBe(3)

  expect(endState['todolistId1'][0].title).toBe('New task')
})


test('correct task should change its title', () => {
  const title = 'New title'
  const endState = tasksReducer(startState, changeTaskTitleAC({
    todolistId: 'todolistId2',
    title: title,
    id: '2',
  }))

  expect(endState['todolistId2'][1].title).toBe(title)
  expect(endState['todolistId2'][0].title).toBe("bread")
  expect(endState['todolistId2'][2].title).toBe("tea")

  expect(endState['todolistId1'][1].title).toBe("JS")
})

test('correct task should change its status', () => {
  const newStatus = true

  const endState = tasksReducer(startState, changeTaskStatusAC({
    todolistId: 'todolistId2',
    isDone: newStatus,
    id: '1',
  }))

  expect(endState['todolistId2'][0].isDone).toBe(newStatus)
  expect(endState['todolistId2'][2].isDone).toBe(false)
})
