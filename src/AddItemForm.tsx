import { Button } from "./Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
  addItem: (todolistId: string) => void;
};
export const AddItemForm = ({ addItem }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
      />
      <Button title={"+"} onClick={addTaskHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
