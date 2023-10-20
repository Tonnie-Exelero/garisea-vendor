export const formatTime = (curr: any, prev: any) => {
  const ms_Min = 60 * 1000; // milliseconds in Minute
  const ms_Hour = ms_Min * 60; // milliseconds in Hour
  const ms_Day = ms_Hour * 24; // milliseconds in day
  const ms_Mon = ms_Day * 30; // milliseconds in Month
  const ms_Yr = ms_Day * 365; // milliseconds in Year
  const diff = curr - prev; //difference between dates.

  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
    return Math.round(diff / 1000) + " seconds ago";

    // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    return Math.round(diff / ms_Min) + " minutes ago";

    // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    return Math.round(diff / ms_Hour) + " hours ago";

    // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    return Math.round(diff / ms_Day) + " days ago";

    // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    return Math.round(diff / ms_Mon) + " months ago";
  } else {
    return Math.round(diff / ms_Yr) + " years ago";
  }
};

export const formatMessageTime = (time: any) => {
  const aMonths = [
    "January",
    "Februray",
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
  const now = new Date();
  const nowNumber = new Date().getTime();
  const messageTime = new Date(time);
  const messageTimeNumber = new Date(time).getTime();
  const diff = nowNumber - messageTimeNumber;
  const aDiff = {
    sec: Math.round(diff / 1000),
    min: Math.round(diff / 1000 / 60),
    h: Math.round(diff / 1000 / 60 / 60),
    d: Math.round(diff / 1000 / 60 / 60 / 24),
  };
  const formatDayOfMonth = (day: number) => {
    // borrowed from https://stackoverflow.com/a/18289487/13987708
    const arrayString = `${day}`.split("").reverse(); // E.g. 123 = ["3","2","1"]
    const arrayNumber = arrayString.map(Number); // Convert ["3","2","1"] to [3,2,1]
    arrayNumber[0] = +arrayNumber[1] === 1 ? 0 : +arrayNumber[0]; // Number is in the teens

    switch (arrayNumber[0]) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };
  const padNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  const formatHoursOfDay = (hour: number, militaryTime: boolean) => {
    return padNumber(!militaryTime ? (hour > 12 ? hour - 12 : hour) : hour);
  };
  const formatedMonth = aMonths[messageTime.getMonth()];
  const formatedDay = formatDayOfMonth(messageTime.getDate());
  const formatedHours = formatHoursOfDay(messageTime.getHours(), true);
  const formatedMinutes = padNumber(messageTime.getMinutes());
  const timeString = `${formatedHours}:${formatedMinutes} ${
    Number(formatedHours) > 11 ? "PM" : "AM"
  }`;
  const dateString = `${formatedMonth} the ${formatedDay}`;

  if (aDiff.min < 60) {
    return `${aDiff.min} ${aDiff.min === 1 ? "minute" : "minutes"} ago`;
  } else if (now.getDate() === messageTime.getDate() && aDiff.d <= 1) {
    return `Today, ${timeString}`;
  } else if (now.getDate() - 1 === messageTime.getDate() && aDiff.d <= 2) {
    return `Yesterday, ${timeString}`;
  } else if (now.getFullYear() === messageTime.getFullYear()) {
    return `${dateString}, ${timeString}`;
  } else {
    return `${dateString}, ${messageTime.getFullYear()}, ${timeString}`;
  }
};
