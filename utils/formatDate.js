export const formatDate = (dateString, extended = false) => {
  const date = new Date(dateString);
  return `${date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}${
    extended
      ? ` at ${date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}`
      : ""
  }`;
};
