import {
  Alert,
  Container,
  createTheme,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { TasksContext } from "./context";
import Task from "./components/Task";
import TasksList from "./components/TasksList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#FFC107",
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState({});
  const [alert, setAlert] = useState({
    isOpen: false,
    msg: "",
  });

  const handleAlertClose = () => {
    setAlert({
      ...alert,
      isOpen: false,
    });
  };

  const handleAlertMsg = (msg) => {
    setAlert({
      isOpen: true,
      msg,
    });
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    handleAlertMsg("New Task Added");
  };

  const selectEdit = (task) => {
    setEditingTask(task);
  };

  const updateTask = (id, task) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach((t, index) => {
      if (t.id === id) {
        tasksCopy[index] = task;
        return;
      }
    });
    setTasks(tasksCopy);
    handleAlertMsg("Task Updated");
  };

  const removeTask = (id) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach((t, index) => {
      if (t.id === id) {
        tasksCopy.splice(index, 1);
        return;
      }
    });
    setTasks(tasksCopy);
    handleAlertMsg("Task Removed");
  };

  return (
    <ThemeProvider theme={theme}>
      <TasksContext.Provider
        value={{
          tasks,
          addTask,
          updateTask,
          removeTask,
          selectEdit,
          editingTask,
          handleAlertMsg,
        }}
      >
        <Container sx={{ padding: "2%" }}>
          <Task />
          <TasksList />
        </Container>
        <Snackbar
          open={alert.isOpen}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleAlertClose}
            icon={false}
            sx={{
              width: "100%",
              backgroundColor: "secondary.main",
              color: "white",
            }}
          >
            {alert.msg}
          </Alert>
        </Snackbar>
      </TasksContext.Provider>
    </ThemeProvider>
  );
}

export default App;
