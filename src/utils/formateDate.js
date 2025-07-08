export const formateDate = (isoDate) => {
  if (!isoDate || typeof isoDate !== "string") return "N/A";

  const date = new Date(isoDate);

  if (isNaN(date)) return "Invalid Date";

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // "11:10 PM"
  });

  return `${datePart.replace(",", "")}, ${timePart}`;
};
