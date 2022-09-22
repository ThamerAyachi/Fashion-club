import { roleReverseFormat } from "../../src/assets/Methods";

describe("Reset the default format of role", () => {
  it("test admin role", () => {
    expect(roleReverseFormat("Admin")).toBe("ADMIN");
  });
  it("test editor role", () => {
    expect(roleReverseFormat("Editor")).toBe("EDITOR");
  });
  it("test super admin role", () => {
    expect(roleReverseFormat("Super admin")).toBe("SUPER_ADMIN");
  });
});
