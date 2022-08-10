export const dateFormat = (data) => {
  const sMonths = "jan feb mar apr may jun jul aug sep oct nov dec";
  const months = sMonths.split(" ");
  let date = data.split("T")[0].split("-");
  return `${months[date[1] - 1]} ${date[2]}, ${date[0]}`;
};

export const firstLetterUpper = (text) => {
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

export const numberFormate = (number) => {
  if (typeof number === typeof 1) {
    number = number.toString();
  }
  let newNumber = "";
  number = number.split("").reverse().join("");
  for (let i = 0; i < number.length; i++) {
    if (i % 3 == 0 && i != 0) newNumber = newNumber + ",";
    newNumber = newNumber + number[i];
  }
  return newNumber.split("").reverse().join("");
};

export const getDeviceType = (data) => {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(data)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      data
    )
  ) {
    return "mobile";
  }
  return "desktop";
};
