import { compareDesc, isSameDay, subDays } from "date-fns";

export const currentStreak = (days: Date[]) => {
  const today = new Date();
  let currentDay = today;

  // sort days by date
  const sortedDays = days.sort((dayAlpha, dayBravo) =>
    compareDesc(dayAlpha, dayBravo),
  );

  // if array is empty - there is no streak
  if (!sortedDays[0]) return 0;

  let streak = 0;

  // if first day is today - remove it from array and set streak to 1
  if (isSameDay(sortedDays[0], today)) {
    streak = 1;
    sortedDays.shift();
  }

  for (let day of sortedDays) {
    currentDay = subDays(currentDay, 1);
    if (!isSameDay(day, currentDay)) {
      break;
    }
    streak++;
  }

  return streak;
};
