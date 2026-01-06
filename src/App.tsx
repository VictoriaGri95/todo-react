import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {getFilteredTasks} from "./utils.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";

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
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  })
//CRUD for tasks
  const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType['id']) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
      ...todolist,
      filter
    } : todolist))
  }

  const changeTodolistTitle = (title: TodolistType['title'], todolistId: TodolistType['id']) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
      ...todolist,
      title,
    } : todolist))
  }

  const deleteTask = (taskId: TaskType['id'], todolistId: TodolistType['id']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
    })
  }

  const createTask = (title: TaskType['title'], todolistId: TodolistType['id']) => {
    const newTask = {id: v1(), title, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  const changeTaskTitle = (taskId: TaskType["id"], title: TaskType['title'], todolistId: TodolistType['id']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {
        ...task,
        title,
      } : task)
    })
  }

  //CRUD for todolist
  const deleteTodolist = (todolistId: TodolistType['id']) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType['isDone'], todolistId: TodolistType['id']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {
        ...task,
        isDone
      } : task)
    })
  }

  const createTodoList = (title: TodolistType['title']) => {
    const newTodolistId = v1()
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title,
      filter: 'All',
    }
    setTodolists([...todolists, newTodolist])
    setTasks({...tasks, [newTodolistId]: []})
  }

  const todolistComponents = todolists.map(tl => {
    return (
      <TodolistItem
        key={tl.id}
        id={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        deleteTodolist={deleteTodolist}
        changeTodolistTitle={changeTodolistTitle}
        changeTaskTitle={changeTaskTitle}
      />
    )
  })

  return (
    <div className="app">
      {/*дает название для тудулиста*/}
      <CreateItemForm createItem={createTodoList} />
      {todolistComponents}
    </div>
  )
}
export default App
