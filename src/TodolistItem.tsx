import {Button} from "./Button.tsx";
import type {FilterValuesType, TodolistType} from "./App.tsx";
import {useState} from "react";
import {Task} from "./Task.tsx";

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
                             }: Props) => {

  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  const createTaskHandler = () => {
    const trimmedTitle = taskInput.trim()
    if (trimmedTitle) {
      createTask(trimmedTitle, id);
    } else {
      setError("true");
    }

    setTaskInput("");
  }

  const isTaskInputValid = taskInput && taskInput.length <= 10
  return (
    <div>
      <h3>{title}
    <Button title={"Delete All"} onClick={() => deleteTodolist(id)}/></h3>

  {/*<span>{filter}</span>*/}
  <div>
  <input
    value={taskInput}
  onChange={(e) => {
    error && setError("false")
    setTaskInput(e.currentTarget.value)
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && isTaskInputValid) {
      createTaskHandler()
    }
  }}
  className={error ? "error" : ""}
  />
  <Button
  title={'+'}
  onClick={createTaskHandler}
  disabled={!taskInput || taskInput.length > 10}
  />
  </div>

  {!error && !taskInput && <div>Max title length is 10 charters</div>}
    {taskInput.length > 10 &&
    <div style={{color: "red"}}>Max title length is 10 charters</div>}
      {taskInput && isTaskInputValid &&
      <div>Your title length is {taskInput.length} charters</div>}
        {error && <div style={{color: "red"}}>Enter valid title</div>}

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


                  return (
                    <Task
                      key={task.id}
                  title={task.title}
                  isDone={task.isDone}
                  id={task.id}
                  deleteTask={deleteTaskHandler}
                  changeTaskStatus={changeTaskStatusHandler}
                  className={task.isDone ? "task-done" : "task"}
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