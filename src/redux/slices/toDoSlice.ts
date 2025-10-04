import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Task = {
  id: number;
  title: string;
  description: string;
};

type InitialState = {
  tasks: Task[];
};

const initialState: InitialState = {
  tasks: [],
};

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    //Actions
    saveTasks: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },

    // Editar tarea 
    editTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },

    //Eliminar tarea
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { saveTasks, editTask, deleteTask } = toDoSlice.actions;

export default toDoSlice.reducer;
