import { eachDayOfInterval, getDay } from "date-fns";

// all days ✅
// every week // selected days  ✅
// alternate week // selected days
// every month // selected days

// create an array of selectedDays
// check if daytype includes in array than return date else return nothing
//

export function dateRange({
  startDate = "2022-12-31T19:30:09.375Z",
  endDate = "2023-01-31T19:30:09.375Z",
  selectedDays = [0, 1, 2, 3, 4, 6],
}) {
  const dates = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const formatedDates = dates.filter(
    (el) => selectedDays.includes(getDay(el)) && el
  );

  return formatedDates;
}

const daysEnum = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturyday: 6,
};

function getDates(startDate, endDate, selectedD) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

export const WeekData = [
  {
    id: 0,
    name: "Sunday",
    alt: "Sun",
  },
  {
    id: 1,
    name: "Monday",
    alt: "Mon",
  },
  {
    id: 2,
    name: "Tuesday",
    alt: "Tue",
  },
  {
    id: 3,
    name: "Wednesday",
    alt: "Wed",
  },
  {
    id: 4,
    name: "Thursday",
    alt: "Thu",
  },
  {
    id: 5,
    name: "Friday",
    alt: "Fri",
  },
  {
    id: 6,
    name: "Saturyday",
    alt: "Sat",
  },
];