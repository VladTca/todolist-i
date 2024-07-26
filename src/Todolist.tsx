import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  todolistId: string;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    taskStatus: boolean,
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (
    todolistId: string,
    title: string,
    newTitle: string,
  ) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    removeTodolist,
    todolistId,
    changeTaskTitle,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todolistId, filter);
  };
  const addTaskHandler = (title: string) => {
    addTask(title, todolistId);
  };
  const changeTaskTitleHandler = (newTitle: string) => {
    changeTaskTitle(todolistId, title, newTitle);
  };
  return (
    <div>
      <h3>
        {/*{title}*/}
        <EditableSpan oldTitle={title} changeItem={changeTaskTitleHandler} />
        <button onClick={() => removeTodolist(props.todolistId)}>x</button>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, props.todolistId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>,
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, props.todolistId, newStatusValue);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                {/*<span>{task.title}</span>*/}
                <EditableSpan
                  oldTitle={task.title}
                  changeItem={changeTaskTitleHandler}
                />
                <Button onClick={removeTaskHandler} title={"x"} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
