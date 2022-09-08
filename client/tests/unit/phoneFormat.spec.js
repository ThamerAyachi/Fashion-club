import { phoneNumberFormat } from "../../src/assets/Methods";

describe("This method get number from 8 digit and format this number to tunisian phone number format", () => {
  it("give it simple example", () => {
    expect(phoneNumberFormat("55123123")).toBe("55 123 123");
  });
});
