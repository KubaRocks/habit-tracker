import create from "zustand";
import { HabitWithLogs } from "@app/pages";

interface Day {
  year: number;
  month: number;
  day: number;
}

interface CalendarState {
  month: number;
  year: number;
  selected?: Day;
  habit?: HabitWithLogs;
  nextMonth: () => void;
  prevMonth: () => void;
  currentMonth: () => void;
  selectDay: (day?: number) => void;
  setHabit: (habit: HabitWithLogs) => void;
}

const today = new Date();

export const useCalendarStore = create<CalendarState>()((set) => ({
  month: today.getMonth(),
  year: today.getFullYear(),
  nextMonth: () =>
    set((state) => {
      if (state.month === 11) {
        return { month: 0, year: state.year + 1 };
      }
      return { month: state.month + 1 };
    }),
  prevMonth: () =>
    set((state) => {
      if (state.month === 0) {
        return { month: 11, year: state.year - 1 };
      }
      return { month: state.month - 1 };
    }),
  currentMonth: () =>
    set(() => ({ month: today.getMonth(), year: today.getFullYear() })),
  selectDay: (day) =>
    set((state) => {
      if (!day || day === state.selected?.day) return { selected: undefined };
      return { selected: { year: state.year, month: state.month, day } };
    }),
  setHabit: (habit) => set(() => ({ habit })),
}));
