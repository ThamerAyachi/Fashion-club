export const dateFormat = (data) => {
  const sMonths = "jan feb mar apr may jun jul aug sep oct nov dec";
  const months = sMonths.split(" ");
  let date = data.split("T")[0].split("-");
  return `${months[date[1] - 1]} ${date[2]}, ${date[0]}`;
};

const firstLetterUpper = (text) => {
  const fLatter = text.slice(0, 1).toUpperCase();
  return fLatter + text.slice(1, text.length);
};

export const roleFormat = (role) => {
  const newRole = role.replace("_", " ").toLowerCase();
  return firstLetterUpper(newRole);
};

export const showFive = (data) => {
  let num = Math.ceil(data.length / 5);
  let arr = [];

  for (let i = 0; i < num; i++) {
    let inArr = [];
    if (i == num - 1) {
      for (let j = i * 5; j < data.length; j++) {
        inArr.push(data[j]);
      }
    } else {
      for (let j = i * 5; j < i * 5 + 5; j++) {
        inArr.push(data[j]);
      }
    }
    arr.push(inArr);
  }
  return arr;
};
