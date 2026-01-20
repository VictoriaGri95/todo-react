import './App.css'
import {useReducer, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {getFilteredTasks} from "./utils.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  Switch,
  ThemeProvider
} from "@mui/material";
import {containerSx} from "./Todolistitem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {indigo, yellow} from "@mui/material/colors";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer
} from "./model/todolists-reducer.ts";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer
} from "./model/tasks.reducer.ts";

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

  // const [todolists, setTodolists] = useState<TodolistType[]>([
  //   {id: todolistId1, title: 'What to learn', filter: 'All'},
  //   {id: todolistId2, title: 'What to buy', filter: 'All'},
  // ])


  // вместо setState
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
  ])


  // const [tasks, setTasks] = useState<TasksStateType>({
  //   [todolistId1]: [
  //     {id: v1(), title: 'HTML&CSS', isDone: true},
  //     {id: v1(), title: 'JS', isDone: true},
  //     {id: v1(), title: 'ReactJS', isDone: false},
  //   ],
  //   [todolistId2]: [
  //     {id: v1(), title: 'Rest API', isDone: true},
  //     {id: v1(), title: 'GraphQL', isDone: false},
  //   ],
  // })

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
  const deleteTask = (id: TaskType['id'], todolistId: TodolistType['id']) => {
    dispatchToTasks(deleteTaskAC({id, todolistId}))
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
    // })
  }

  const createTask = (title: TaskType['title'], todolistId: TodolistType['id']) => {
    // const newTask = {id: v1(), title, isDone: false}
    // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    dispatchToTasks(createTaskAC({title, todolistId}))
  }

  const changeTaskTitle = (id: TaskType["id"], title: TaskType['title'], todolistId: TodolistType['id']) => {
    dispatchToTasks(changeTaskTitleAC({title, id, todolistId}))
  }

  const changeTaskStatus = (id: TaskType["id"], isDone: TaskType['isDone'], todolistId: TodolistType['id']) => {
    dispatchToTasks(changeTaskStatusAC({id, isDone, todolistId}))
  }


  //CRUD for todolist
  const deleteTodolist = (id: TodolistType['id']) => {
    // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    dispatchToTodolists(deleteTodolistAC(id))

    // const copyTasksState = {...tasks}
    // delete copyTasksState[id]
    // setTasks(copyTasksState)

    dispatchToTasks(deleteTodolistAC(id))

  }

  const createTodoList = (title: TodolistType['title']) => {
    const action = createTodolistAC(title)
    dispatchToTodolists(action)
    //
    // const newTodolistId = v1()
    // const newTodolist: TodolistType = {
    //   id: newTodolistId,
    //   title,
    //   filter: 'All',
    // }
    // setTodolists([...todolists, newTodolist])
    dispatchToTasks(createTodolistAC(title))
    // setTasks({...tasks, [action.payload.id]: []})
  }

  const changeTodolistTitle = (title: TodolistType['title'], id: TodolistType['id']) => {
    // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
    //   ...todolist,
    //   title,
    // } : todolist))
    dispatchToTodolists(changeTodolistTitleAC({id: id, title}))
  }

  const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType['id']) => {
    // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
    //   ...todolist,
    //   filter
    // } : todolist))
    dispatchToTodolists(changeTodolistFilterAC({
      id: todolistId,
      filter: filter
    }))
  }


  const todolistComponents = todolists.map(tl => {
    return (
      <Grid key={tl.id}>
        <Paper
          elevation={8}
          sx={{padding: '10px'}}
        >
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
        </Paper>
      </Grid>


    )
  })

  const [isDark, setIsDark] = useState(false)

  const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: yellow,
      mode: isDark ? 'dark' : 'light',
    },
  })

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <Switch onChange={() => setIsDark(!isDark)} />
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.light}>Faq</NavButton>
            </div>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">

          <Grid
            container
            sx={{padding: '10px 0'}}
          >
            {/*дает название для тудулиста*/}
            <CreateItemForm createItem={createTodoList} />
          </Grid>
          <Grid
            container
            spacing={4}
          >
            {todolistComponents}
          </Grid>

        </Container>
      </ThemeProvider>

    </div>
  )
}
export default App
