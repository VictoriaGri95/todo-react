
import type {TaskType} from "./TodolistItem.ts";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {containerSx, getListItemSx} from "./Todolistitem.styles.ts";


type Props = {
  id: TaskType['id']
  title: string
  isDone: boolean
  deleteTask: (taskId: TaskType['id']) => void
  changeTaskStatus: (isDone: boolean) => void
  className?: string
  changeTaskTitle: (newTitle: TaskType['title']) => void
}

export const Task = ({
                       id,
                       title,
                       isDone,
                       deleteTask,
                       changeTaskStatus,
                       // className,
                       changeTaskTitle,
                     }: Props) => {
  return (
    <ListItem
      disablePadding
      sx={containerSx}
    >
      <Box sx={getListItemSx(isDone)}>
        <Checkbox
          size={"small"}
          checked={isDone}
          onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
        />

        <EditableSpan
          // className={className}
          title={title}
          changeTitle={changeTaskTitle}
        />
      </Box>

      <IconButton
        size="small"
        onClick={() => deleteTask(id)}
      >
        <DeleteOutlineIcon />
      </IconButton>

    </ListItem>
  )
}

