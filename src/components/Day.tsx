import React from "react";
import { useCalendarStore } from "@app/hooks/useCalendarStore";
import clsx from "clsx";
import { trpc } from "@app/utils/trpc";
import { isSameDay } from "date-fns/fp";

export const Day: React.FC<{ day: number }> = ({ day }) => {
  const today = new Date();
  const utils = trpc.useContext();
  const {
    month,
    year,
    selected: selectedDay,
    selectDay,
    habit,
  } = useCalendarStore();
  const { mutate } = trpc.useMutation("habit.track", {
    async onSuccess() {
      await utils.queryClient.invalidateQueries("habit.getBySlug");
    },
  });
  // need to add hour 12 because of frickin' timezone shit
  const dayAsDate = new Date(year, month, day, 12);
  const isToday = isSameDay(today, dayAsDate);
  const isSelected =
    selectedDay &&
    isSameDay(
      dayAsDate,
      new Date(selectedDay.year, selectedDay.month, selectedDay.day),
    );

  if (!habit) return null;

  const handleTrackClick = () => {
    mutate({
      habitId: habit.id,
      participatedAt: dayAsDate,
    });
  };

  const handleSelect = () => {
    if (isTracked) return selectDay(undefined);
    selectDay(day);
  };

  const isTracked = Boolean(
    habit.logs.find((log) => {
      return isSameDay(log.participatedAt, dayAsDate);
    }),
  );

  if (isTracked) {
    return (
      <DayContainer onClick={handleSelect} background={habit.color}>
        <DayNumber day={day} isToday={isToday} />
      </DayContainer>
    );
  }

  return (
    <DayContainer selected={isSelected} onClick={handleSelect}>
      {!isSelected && <DayNumber day={day} isToday={isToday} />}
      {isSelected && (
        <div className="inline-flex h-[100%] w-[100%] items-center justify-center text-6xl text-white">
          <button
            type="button"
            className="inline-block h-12 w-12 rounded-full bg-white uppercase leading-normal text-green-700 shadow-md transition duration-150 ease-in-out hover:shadow-xl focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-xl"
            onClick={handleTrackClick}
          >
            <svg
              className="h-12 w-12 fill-current text-green-500 transition duration-200 ease-in-out hover:text-green-700"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
            </svg>
          </button>
        </div>
      )}
    </DayContainer>
  );
};

const DayContainer: React.FC<{
  selected?: boolean;
  background?: string;
  onClick: () => void;
  children?: React.ReactNode;
}> = ({ selected, onClick, children, background }) => {
  return (
    <div
      className={clsx(
        "relative h-[120px] w-[14.28%] border-r border-b px-4 transition duration-200 ease-in-out",
        { "bg-green-400": selected },
        { "hover:bg-gray-100": !selected },
      )}
      style={background ? { backgroundColor: background } : {}}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const DayNumber: React.FC<{ day: number; isToday: boolean }> = ({
  isToday,
  day,
}) => {
  return (
    <div
      className={clsx(
        "mt-2 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-center leading-none transition duration-100 ease-in-out",
        { "bg-blue-500 text-white": isToday },
        { "text-gray-700 hover:bg-blue-200": !isToday },
      )}
    >
      {day}
    </div>
  );
};
