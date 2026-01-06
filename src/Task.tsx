import {Button} from "./Button.tsx";
import type {TaskType} from "./TodolistItem.ts";
import {EditableSpan} from "./EditableSpan.tsx";


type Props = {
  id: TaskType['id']
  title: string
  isDone: boolean
  deleteTask: (taskId: TaskType['id']) => void
  changeTaskStatus: (isDone: boolean) => void
  className: string
  changeTaskTitle: (newTitle: TaskType['title']) => void
}

export const Task = ({
                       id,
                       title,
                       isDone,
                       deleteTask,
                       changeTaskStatus,
                       className,
                       changeTaskTitle,
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
      <EditableSpan
        className={className}
        title={title}
        changeTitle={changeTaskTitle}
      />

    </li>
  )
}

