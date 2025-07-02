export const formateDate = (isoDate) => {
  const date = new Date(isoDate);

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
