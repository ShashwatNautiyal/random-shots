import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

interface ThemeState {
  mode?: "dark" | "light";
}

const initialState: ThemeState = {
  mode:
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : undefined
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"dark" | "light">) => {
      localStorage.setItem("theme-mode", action.payload);
      state.mode = action.payload;
    }
  }
});

export const { setMode } = ThemeSlice.actions;

export default ThemeSlice.reducer;
