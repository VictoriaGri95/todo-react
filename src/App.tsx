import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {getFilteredTasks} from "./utils.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Container, createTheme,
  CssBaseline,
  Grid,
  Paper, Switch,
  ThemeProvider
} from "@mui/material";
import {containerSx} from "./Todolistitem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {
  indigo,
  yellow
} from "@mui/material/colors";

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
              <Switch onChange={()=> setIsDark(!isDark)} />
              <NavButton >Sign in</NavButton>
              <NavButton >Sign up</NavButton>
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
