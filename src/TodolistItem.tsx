import {Button} from "./Button.tsx";
import type {FilterValuesType, TodolistType} from "./App.tsx";
import {Task} from "./Task.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

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
    <div>
      <h3>
        <EditableSpan
          title={title}
          changeTitle={changeTodolistTitleHandler}
        />
        <Button
          title={"Delete All"}
          onClick={() => deleteTodolist(id)}
        /></h3>

      {/*<span>{filter}</span>*/}

      {/*дает название для таски*/}
      <CreateItemForm createItem={createTaskHandler} />

      {
        tasks.length === 0
          ? <p>Тасок нет</p>
          : <ul>
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
          </ul>
      }
      <div>
        <Button
          title={'All'}
          onClick={() => changeTodolistFilter("All", id)}
          className={filter === "All" ? "filter-btn-active" : ""}
        />
        <Button
          title={'Active'}
          onClick={() => changeTodolistFilter("Active", id)}
          className={filter === "Active" ? "filter-btn-active" : ""}
        />
        <Button
          title={'Completed'}
          onClick={() => changeTodolistFilter("Completed", id)}
          className={filter === "Completed" ? "filter-btn-active" : ""}
        />
      </div>
    </div>
  )
}