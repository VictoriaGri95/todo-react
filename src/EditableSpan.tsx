import {useState} from "react";

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
      ? <input
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

