import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {getFilteredTasks} from "./utils.ts";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TasksStateType = {
  [todolistId: string]: TaskType[]
}

const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType['id']) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
  }

  const deleteTodolist = (todolistId: TodolistType['id']) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const deleteTask = (taskId: TaskType['id'], todolistId: TodolistType['id']) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }

  const createTask = (title: TaskType['title'], todolistId: TodolistType['id']) => {
    const newTask = {id: v1(), title, isDone: false}
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType['isDone'], todolistId: TodolistType['id']) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task)})
  }

  const todolistComponents = todolists.map(tl=> {
    return (
      <TodolistItem key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                    deleteTask={deleteTask}
                    changeTodolistFilter={changeTodolistFilter}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={deleteTodolist}/>
    )
  })

  return (
    <div className="app">
      {todolistComponents}
    </div>
  )
}
export default App
