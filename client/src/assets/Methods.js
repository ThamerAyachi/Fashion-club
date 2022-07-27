export const dateFormat = (data) => {
  const sMonths = "jan feb mar apr may jun jul aug sep oct nov dec";
  const months = sMonths.split(" ");
  let date = data.split("T")[0].split("-");
  return `${months[date[1] - 1]} ${date[2]}, ${date[0]}`;
};
