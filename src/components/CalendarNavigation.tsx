import React, { PropsWithChildren } from "react";
import { useCalendarStore } from "@app/hooks/useCalendarStore";

export const CalendarNavigation = () => {
  const { prevMonth, nextMonth, currentMonth } = useCalendarStore();

  return (
    <ButtonGroup>
      <PrevButton onClick={prevMonth} />
      <TodayButton onClick={currentMonth} />
      <NextButton onClick={nextMonth} />
    </ButtonGroup>
  );
};

const ButtonGroup: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex rounded-lg border px-1 pt-[2px]">{children}</div>;
};

interface Clickable {
  onClick: () => void;
}

const PrevButton: React.FC<Clickable> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center rounded-lg p-1 leading-none transition duration-100 ease-in-out hover:bg-gray-200"
    >
      <svg
        className="inline-flex h-6 w-6 leading-none text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

const TodayButton: React.FC<Clickable> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center rounded-lg py-2 px-4 leading-none transition duration-100 ease-in-out hover:bg-gray-200"
    >
      Today
    </button>
  );
};

const NextButton: React.FC<Clickable> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center rounded-lg p-1 leading-none transition duration-100 ease-in-out hover:bg-gray-200"
    >
      <svg
        className="inline-flex h-6 w-6 leading-none text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};
