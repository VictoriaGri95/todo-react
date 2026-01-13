import {useState} from "react";
import {IconButton, TextField} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

type CreateItemFormProps = {
  createItem: (title: string) => void;
};

export const CreateItemForm = ({createItem}: CreateItemFormProps) => {
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState(false);

  const isTaskInputValid =
    taskInput.trim().length > 0 && taskInput.trim().length <= 10;

  const createTaskHandler = () => {
    const trimmedTitle = taskInput.trim();

    if (!trimmedTitle || trimmedTitle.length > 10) {
      setError(true);
      return;
    }

    createItem(trimmedTitle);
    setTaskInput("");
    setError(false);
  };

  return (
    <div>
      <TextField
        label={'Enter a title'}
        size="small"
        value={taskInput}
        onChange={(e) => {
          setTaskInput(e.currentTarget.value);
          if (error) setError(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTaskHandler();
          }
        }}
        error={error}
        helperText={error ? "Enter valid title (1–10 chars)" : ""}
      />

      <IconButton
        size="small"
        onClick={createTaskHandler}
      >
        <EditNoteIcon />
      </IconButton>

      {!taskInput && !error && (
        <div>Max title length is 10 characters</div>
      )}

      {taskInput.length > 10 && (
        <div style={{color: "red"}}>
          Max title length is 10 characters
        </div>
      )}

      {isTaskInputValid && (
        <div>Your title length is {taskInput.trim().length} characters</div>
      )}

      {error && (
        <div style={{color: "red"}}>
          Enter valid title
        </div>
      )}
    </div>
  );
};
