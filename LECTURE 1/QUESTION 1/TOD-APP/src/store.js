import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

// 1. VITE-SAFE CUSTOM STORAGE ADAPTER
const customStorage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

// 2. REDUX SLICE (Logic)
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [],
    filter: 'all', // 'all', 'active', 'completed'
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.text = text;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter } = todoSlice.actions;

// 3. PERSIST CONFIGURATION
const persistConfig = {
  key: 'root',
  storage: customStorage, // Using our Vite-safe adapter here
};

const persistedReducer = persistReducer(persistConfig, todoSlice.reducer);

// 4. STORE SETUP
export const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to stop Redux Toolkit from throwing warnings about redux-persist
    }),
});

export const persistor = persistStore(store);