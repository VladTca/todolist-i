import { ChangeEvent, useState } from "react";

type Props = {
  oldTitle: string;
  changeItem: (title: string) => void;
};
export const EditableSpan = ({ oldTitle, changeItem }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [newtitle, setNewTitle] = useState(oldTitle);

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const activateEditMode = () => {
    setEditMode(!editMode);
    if (editMode && newtitle.trim()) {
      changeItem(newtitle.trim());
    }
  };

  return editMode ? (
    <input
      value={newtitle}
      onBlur={activateEditMode}
      autoFocus
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{newtitle}</span>
  );
};
