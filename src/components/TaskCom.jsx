import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TasksContext } from "../context";
import { Edit } from "@mui/icons-material";

const TaskCom = ({ task }) => {
  const { removeTask, updateTask, selectEdit } = useContext(TasksContext);

  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => selectEdit(task)}
            sx={{
              color: "white",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <Edit />
          </IconButton>{" "}
          <IconButton
            sx={{
              marginLeft: 5,
              color: "white",
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "secondary.light",
              },
            }}
            edge="end"
            aria-label="comments"
            onClick={() => removeTask(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
      alignItems="center"
    >
      <ListItemIcon>
        <Switch
          checked={task.status === "completed"}
          onChange={(e) =>
            updateTask(task.id, {
              ...task,
              status:
                task.status === "completed" ? "not-completed" : "completed",
            })
          }
          inputProps={{ "aria-label": "controlled" }}
        />
      </ListItemIcon>
      <ListItemText
        id={task.id}
        primary={
          <p>
            {task.title} - {task.description} -{" "}
            {task.status === "completed" ? "Completed" : "Not Completed"} -{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        }
      />
    </ListItem>
  );
};

export default TaskCom;
