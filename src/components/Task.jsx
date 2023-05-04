import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TasksContext } from "../context";

const Task = () => {
  const [taskDetails, setTaskDetails] = useState({});
  const { tasks, addTask, editingTask, selectEdit, updateTask } =
    useContext(TasksContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = tasks?.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;

    if (editingTask.id >= 0) {
      return setTaskDetails({
        ...editingTask,
        dueDate: dayjs(new Date(editingTask.dueDate).toLocaleDateString()),
      });
    }
    setTaskDetails({
      id,
      title: "",
      description: "",
      status: "not-completed",
      dueDate: null,
    });
  }, [tasks, editingTask]);

  const onChange = (e) => {
    setTaskDetails((state) => {
      return {
        ...state,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: 5 }}>
        {editingTask.id >= 0 ? "Update Task" : "Add New Task"}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={5}
      >
        <TextField
          required
          id="title"
          label="Title"
          value={taskDetails.title}
          onChange={onChange}
        />

        <TextField
          required
          id="description"
          label="Description"
          value={taskDetails.description}
          onChange={onChange}
        />

        <FormControl id="status" sx={{ m: 1, width: 250 }}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            open={open}
            id="status"
            value={taskDetails.status}
            onChange={(e) =>
              setTaskDetails({ ...taskDetails, status: e.target.value })
            }
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="not-completed">Not Completed</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Due Date"
              value={taskDetails.dueDate}
              onChange={(v) =>
                setTaskDetails({ ...taskDetails, dueDate: new Date(v.$d) })
              }
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          size="large"
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
          onClick={() => {
            if (editingTask.id >= 0) {
              updateTask(taskDetails.id, taskDetails);
            } else {
              addTask(taskDetails);
            }
            selectEdit({});
            setTaskDetails({});
          }}
        >
          {editingTask.id >= 0 ? "Update" : "Add"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Task;
