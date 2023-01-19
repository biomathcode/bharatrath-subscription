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
  selectedDays = [0, 1, 2, 3, 4, 5, 6],
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

export const TimeSlots = [
  {
    label: "6-9 am",
    startTime: "6:00",
    endTime: "9:00",
  },
  {
    label: "9-12 am",
    startTime: "9:00",
    endTime: "12:00",
  },
  {
    label: "12-3 pm",
    startTime: "12:00",
    endTime: "15:00",
  },
  {
    label: "3-6 pm",
    startTime: "15:00",
    endTime: "18:00",
  },
  {
    label: "6-9 pm",
    startTime: "18:00",
    endTime: "21:00",
  },
];

export const WeekData = [
  {
    // id: 0,
    value: 0,
    label: "Sunday",
  },
  {
    // id: 1,
    value: 1,
    label: "Monday",
  },
  {
    // id: 2,
    value: 2,
    label: "Tuesday",
  },
  {
    // id: 3,
    value: 3,
    label: "Wednesday",
  },
  {
    // id: 4,
    value: 4,
    label: "Thurday",
  },
  {
    // id: 5,
    value: 5,
    label: "Friday",
  },
  {
    // id: 6,
    value: 6,
    label: "Saturday",
  },
];
