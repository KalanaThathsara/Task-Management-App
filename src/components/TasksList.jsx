import React, { useContext, useState, useEffect } from "react";
import TaskCom from "./TaskCom";
import { TasksContext } from "../context";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

const TasksList = () => {
  const { tasks } = useContext(TasksContext);
  const [open, setOpen] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sort, setSort] = useState("desc");
  const [sortedTasks, setSortedTasks] = useState([]);

  const dateComparison = (a, b) => {
    const date1 = new Date(a.dueDate);
    const date2 = new Date(b.dueDate);

    if (sort === "asc") return date1 - date2;
    return date2 - date1;
  };

  useEffect(() => {
    if (filter !== "all") {
      const tasksList = [...tasks];
      const filteredList = tasksList.filter((task) => task.status === filter);
      setFilteredTasks(filteredList);
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, filter]);

  useEffect(() => {
    const unsortedList = [...filteredTasks];
    unsortedList.sort(dateComparison);
    setSortedTasks(unsortedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTasks, sort]);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          marginTop: "2%",
        }}
      >
        <FormControl id="filter" sx={{ m: 1, width: 250 }}>
          <InputLabel id="filter">Filter</InputLabel>
          <Select
            open={open === "filter"}
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onOpen={() => setOpen("filter")}
            onClose={() => setOpen("")}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="not-completed">Not Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl id="sort" sx={{ m: 1, width: 250 }}>
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            open={open === "sort"}
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            onOpen={() => setOpen("sort")}
            onClose={() => setOpen("")}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <List
        sx={{
          width: "100%",
          maxWidth: 600,
          marginInline: "auto",
        }}
      >
        {sortedTasks?.map((task) => {
          return <TaskCom task={task} />;
        })}
      </List>
    </Box>
  );
};

export default TasksList;
