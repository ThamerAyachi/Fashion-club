import {
  dateFormat,
  firstLetterUpper,
  roleFormat,
  showFive,
  numberFormate,
  getDeviceType,
} from "../../src/assets/Methods";

// dateFormat Function
describe("Test Function dateFormat for format date", () => {
  it("Format date to give month on form three char, day and year ", () => {
    expect(dateFormat("2022-07-26T15:24:27.000Z")).toBe("jul 26, 2022");
  });

  it("Try to giv error format", () => {
    expect(dateFormat("2020-01-30T10Z")).toBe("jan 30, 2020");
  });
});

// firstLetterUpper Function
describe("Testing firstLetterUpper function to make first latter upper case", () => {
  it("Give the regular String", () => {
    expect(firstLetterUpper("ahmed")).toBe("Ahmed");
  });

  it("Give two word", () => {
    expect(firstLetterUpper("thamer ayachi")).toBe("Thamer ayachi");
  });
});

// roleFormat Function
describe("This function replace '_' to ' ' and make all letter to lower case expect first latter upper case", () => {
  it("Give regular String", () => {
    expect(roleFormat("THAMER")).toBe("Thamer");
  });

  it("Give two word with '_'", () => {
    expect(roleFormat("one_two")).toBe("One two");
  });

  it("Test all function", () => {
    expect(roleFormat("SUPER_ADMIN")).toBe("Super admin");
  });
});

// showFive Function
describe("This function when you give hem array with more five elements give you many arrays has maxmem five elements", () => {
  it("Give sample array", () => {
    expect(showFive([1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
  });

  it("Give more five elements", () => {
    expect(showFive([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([
      [1, 2, 3, 4, 5],
      [6, 7, 8],
    ]);
  });
});

// numberFormate function
describe("This function add after every three number ',' and change from number to string", () => {
  it("Give small number", () => {
    expect(numberFormate(123)).toBe("123");
  });

  it("Give medium number", () => {
    expect(numberFormate(12345)).toBe("12,345");
  });

  it("Give long number", () => {
    expect(numberFormate(12345678912345)).toBe("12,345,678,912,345");
  });
});

// getDeviceType function
describe("This function give what user use (tablet or mobile or desktop)", () => {
  it("When user use desktop", () => {
    const data =
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36";

    expect(getDeviceType(data)).toBe("desktop");
  });

  it("When user use mobile", () => {
    const data =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    expect(getDeviceType(data)).toBe("mobile");
  });

  it("When user use tablet", () => {
    const data =
      "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1";

    expect(getDeviceType(data)).toBe("tablet");
  });
});
