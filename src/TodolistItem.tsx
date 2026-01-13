// import {Button} from "./Button.tsx";
import type {FilterValuesType, TodolistType} from "./App.tsx";
import {Task} from "./Task.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, IconButton, List} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {containerSx} from "./Todolistitem.styles.ts";

type Props = {
  id: string;
  title: string
  tasks: TaskType []
  filter: FilterValuesType
  deleteTask: (taskId: TaskType['id'], todolistId: TodolistType['id']) => void
  createTask: (title: TaskType['title'], todolistId: TodolistType['id']) => void
  changeTodolistFilter: (filter: FilterValuesType, todolistId: TodolistType['id']) => void
  changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType['isDone'], todolistId: TodolistType['id']) => void
  deleteTodolist: (todolistId: TodolistType['id']) => void
  changeTodolistTitle: (title: TodolistType['title'], todolistId: TodolistType['id']) => void
  changeTaskTitle: (taskId: TaskType["id"], title: TaskType['title'], todolistId: TodolistType['id']) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const TodolistItem = ({
                               id,
                               title,
                               tasks,
                               deleteTask,
                               createTask,
                               filter,
                               changeTodolistFilter,
                               changeTaskStatus,
                               deleteTodolist,
                               changeTodolistTitle,
                               changeTaskTitle,
                             }: Props) => {

  // const [taskInput, setTaskInput] = useState("");
  // const [error, setError] = useState("");

  const createTaskHandler = (title: TaskType['title']) => {
    createTask(title, id);
  }

  const changeTodolistTitleHandler = (newTitle: TaskType['title']) => {
    changeTodolistTitle(newTitle, id)
  }

  // const isTaskInputValid = taskInput && taskInput.length <= 10
  return (
    <Box sx={{minWidth: '270px'}}>
      <h3>
        <EditableSpan
          title={title}
          changeTitle={changeTodolistTitleHandler}
        />

        <IconButton
          size="small"
          onClick={() => deleteTodolist(id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </h3>

      {/*<span>{filter}</span>*/}

      {/*дает название для таски*/}
      <CreateItemForm createItem={createTaskHandler} />

      {
        tasks.length === 0
          ? <p>Тасок нет</p>
          : <List disablePadding={true}>
            {
              tasks.map(task => {

                  const changeTaskStatusHandler = (isDone: TaskType['isDone']) => {
                    changeTaskStatus(task.id, isDone, id)
                  }

                  const deleteTaskHandler = () => deleteTask(task.id, id)

                  const changeTaskTitleHandler = (newTitle: TaskType['title']) => {
                    changeTaskTitle(task.id, newTitle, id)
                  }
                  return (
                    <Task
                      key={task.id}
                      title={task.title}
                      isDone={task.isDone}
                      id={task.id}
                      deleteTask={deleteTaskHandler}
                      changeTaskStatus={changeTaskStatusHandler}
                      className={task.isDone ? "task-done" : "task"}
                      changeTaskTitle={changeTaskTitleHandler}
                    />
                  )
                }
              )
            }
          </List>
      }
      <Box sx={containerSx}>
        <Button
          size={"small"}
          color={filter === 'All' ? 'secondary' : "primary"}
          variant="contained"
          onClick={() => changeTodolistFilter("All", id)}
          className={filter === "All" ? "filter-btn-active" : ""}
        >All</Button>
        <Button
          size={"small"}
          color={filter === 'Active' ? 'secondary' : "primary"}
          variant="contained"
          onClick={() => changeTodolistFilter("Active", id)}
          className={filter === "Active" ? "filter-btn-active" : ""}
        >Active</Button>
        <Button
          size={"small"}
          color={filter === 'Completed' ? 'secondary' : "primary"}
          variant="contained"
          onClick={() => changeTodolistFilter("Completed", id)}
          className={filter === "Completed" ? "filter-btn-active" : ""}
        >Completed</Button>

      </Box>
    </Box>
  )
}