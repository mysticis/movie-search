const date = new Date("2010-08-05");
const dateTimeFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});
const [
  { value: month },
  ,
  { value: day },
  ,
  { value: year },
] = dateTimeFormat.formatToParts(date);
console.log(month, day + ",", year);
