import { describe, test, expect } from "@jest/globals";
import { currentStreak } from "./currentStreak";
import { startOfYesterday, subDays } from "date-fns";

describe("current streak helper", () => {
  test("it returns 0 for empty array", () => {
    expect(currentStreak([])).toBe(0);
  });

  test("it returns 1 for array containing today's date", () => {
    expect(currentStreak([new Date()])).toBe(1);
  });

  test("it returns 1 for array containing yesterday's date", () => {
    expect(currentStreak([startOfYesterday()])).toBe(1);
  });

  test("it returns 2 for array containing today's and yesterdays date", () => {
    expect(currentStreak([new Date(), startOfYesterday()])).toBe(2);
  });

  test("it returns proper value for a streak starting yesterday", () => {
    const yesterday = startOfYesterday();
    expect(
      currentStreak([
        yesterday,
        subDays(yesterday, 1),
        subDays(yesterday, 2),
        subDays(yesterday, 3),
      ]),
    ).toBe(4);
  });

  test("it returns proper value for a streak starting today", () => {
    const today = new Date();
    expect(
      currentStreak([
        today,
        subDays(today, 1),
        subDays(today, 2),
        subDays(today, 5),
        subDays(today, 6),
      ]),
    ).toBe(3);
  });

  test("it works for unsorted array", () => {
    const yesterday = startOfYesterday();
    expect(
      currentStreak([
        subDays(yesterday, 1),
        yesterday,
        subDays(yesterday, 3),
        subDays(yesterday, 2),
      ]),
    ).toBe(4);
  });
});
