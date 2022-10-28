import React, { useEffect, useState } from "react";
import { useCalendarStore } from "@app/hooks/useCalendarStore";
import { CalendarNavigation } from "@app/components/CalendarNavigation";
import { Day } from "@app/components/Day";
import { HabitWithLogs } from "@app/pages";
import { currentStreak } from "@app/utils/currentStreak";

export const Calendar: React.FC<{ habit: HabitWithLogs }> = ({ habit }) => {
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const { month, year, setHabit } = useCalendarStore();

  useEffect(() => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(year, month).getDay();
    let blankDaysArray = [];
    for (let i = 1; i <= dayOfWeek - 1; i++) {
      blankDaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setHabit(habit);
    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  }, [month, year, habit, setHabit]);

  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="sans-serif h-screen bg-gray-100 antialiased">
      <div className="container mx-auto px-4 py-2 md:py-24">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="flex items-center justify-between py-2 px-6">
            <div>
              <span className="text-lg font-bold text-gray-800">
                {MONTH_NAMES[month]}
              </span>
              <span className="ml-1 text-lg font-normal text-gray-600">
                {year}
              </span>
            </div>
            {habit && (
              <div>
                <span className="text-lg font-bold text-gray-800">
                  {habit.name}
                </span>{" "}
                streak:{" "}
                {currentStreak(habit.logs.map((log) => log.participatedAt))}
              </div>
            )}
            <CalendarNavigation />
          </div>

          {/* start days container */}
          <div className="-mx-1 -mb-1">
            <div className="mb-[-40px] flex flex-wrap">
              {/* iterate over days */}
              {DAYS.map((DAY) => (
                <div key={DAY} className="w-[14.26%] px-2 py-2">
                  <div className="relative z-10 text-center text-sm font-bold uppercase tracking-wide text-gray-600">
                    {DAY}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap border-t border-l">
              {blankDays.map((day, index) => (
                <div
                  key={index}
                  className="h-[120px] w-[14.28%] border-r border-b px-4 pt-2 text-center"
                ></div>
              ))}
              {noOfDays.map((day, index) => (
                <Day key={index} day={day} />
              ))}
            </div>
          </div>
          {/* end days container */}
        </div>
      </div>
    </div>
  );
};
