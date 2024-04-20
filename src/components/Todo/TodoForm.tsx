import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

import "../../styles/main.scss";
import { Todo } from "../../interfaces/types";

type TodoFormProps = {
  todo?: Todo;
  onTaskFormSubmit: (task: string, id?: string) => void;
};
export const TodoForm = ({ onTaskFormSubmit, todo }: TodoFormProps) => {
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    if (todo) {
      setTask(todo.task);
    }
  }, [todo]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    onTaskFormSubmit(task, todo?.id);
    setTask("");
  };

  return (
    <form
      name="todo-form"
      className={todo ? "todo-form todo-form--edit-mode" : "todo-form"}
      onSubmit={onFormSubmit}
    >
      <input
        data-testid={`${todo ? "edit" : "create"}-input`}
        placeholder="Enter what needs to be done"
        type="text"
        name="task"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {task ? (
        <>
          <span
            data-testid="clear-input"
            className="todo-clear-button"
            onClick={() => setTask("")}
          >
            <CiCircleRemove size={24} />
          </span>
        </>
      ) : null}
      <button
        data-testid="task-submit"
        className="todo-submit-button"
        type="submit"
        disabled={!task}
      >
        <FaPlus color="#FFFFFF" />
        <span>{todo ? "Save" : "Add task"} </span>
      </button>
    </form>
  );
};
