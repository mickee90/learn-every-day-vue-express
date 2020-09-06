export function fullDate(date) {
  if (!date) return "";

  const [{ value: year }, , { value: month }, , { value: day }] = extractParts(date);

  return `${year}-${month}-${day}`;
}

export function fullDateTime(date) {
  if (!date) return "";

  const [
    { value: year },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: hour },
    ,
    { value: minute }
  ] = extractParts(date);

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function extractParts(date) {
  const dt = new Date(date);

  const dateTimeFormat = new Intl.DateTimeFormat("sv", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  return dateTimeFormat.formatToParts(dt);
}
