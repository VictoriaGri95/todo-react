import {Button} from "./Button.tsx";
import type {TaskType} from "./TodolistItem.ts";


type Props = {
  id: TaskType['id']
  title: string
  isDone: boolean
  deleteTask: (taskId: TaskType['id']) => void
  changeTaskStatus: (isDone: boolean) => void
  className: string
}

export const Task = ({
                       id,
                       title,
                       isDone,
                       deleteTask,
                       changeTaskStatus,
                       className
                     }: Props) => {
  return (
    <li>
      <Button
        title={"X"}
        onClick={() => deleteTask(id)}
      />
      <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
      />
      <span className={className}>{title}</span>

    </li>
  )
}

