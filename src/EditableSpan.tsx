import {useState} from "react";
import {TextField} from "@mui/material";

type Props = {
  title: string,
  className?: string,
  changeTitle: (newTitle: string) => void,
}
export const EditableSpan = ({title, changeTitle, className}: Props) => {

  const [editMode, setEditMode] = useState(false)
  const [titleInput, setTitleInput] = useState("");

  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    setEditMode(false)
    changeTitle(titleInput)
  }

  return (
    editMode
      ? <TextField
        id="standard-basic"
        variant="standard"
        value={titleInput}
        autoFocus
        onBlur={offEditMode}
        onChange={(e) => setTitleInput(e.currentTarget.value)}
      />
      : <span
        onDoubleClick={onEditMode}
        className={className}
      >{title}</span>
  );
};

