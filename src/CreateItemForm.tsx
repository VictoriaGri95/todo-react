import {Button} from "./Button.tsx";
import {useState} from "react";

type CreateItemFormProps = {
  createItem: (title: string) => void;
}

export const CreateItemForm = ({createItem}: CreateItemFormProps) => {
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  const isTaskInputValid = taskInput && taskInput.length <= 10

  const createTaskHandler = () => {
    const trimmedTitle = taskInput.trim()
    if (trimmedTitle) {
      createItem(trimmedTitle);
    } else {
      setError("true");
    }
    setTaskInput("");
  }


  return (
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


      {!error && !taskInput && <div>Max title length is 10 charters</div>}
      {taskInput.length > 10 &&
        <div style={{color: "red"}}>Max title length is 10 charters</div>}
      {taskInput && isTaskInputValid &&
        <div>Your title length is {taskInput.length} charters</div>}
      {error && <div style={{color: "red"}}>Enter valid title</div>}
    </div>
  );
};

