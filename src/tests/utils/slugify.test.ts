import { describe, it, expect } from "vitest";
import { slugify } from "../../utils/slugify";

describe("slugify", () => {
  it("converts spaces and special characters to hyphens", () => {
    expect(slugify("Magic: The Gathering")).toBe("magic-the-gathering");
    expect(slugify("Disney Lorcana!")).toBe("disney-lorcana");
    expect(slugify("Pokemon TCG")).toBe("pokemon-tcg");
  });

  it("trims and lowers case", () => {
    expect(slugify("  Riftbound  ")).toBe("riftbound");
    expect(slugify("RIFTBOUND")).toBe("riftbound");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("!!Hello World!!")).toBe("hello-world");
    expect(slugify(" ---Test--- ")).toBe("test");
  });

  it("handles consecutive special characters", () => {
    expect(slugify("One---Two@@@Three")).toBe("one-two-three");
    expect(slugify("A__B__C")).toBe("a-b-c");
  });

  it("returns empty string when input is empty or only special characters", () => {
    expect(slugify("")).toBe("");
    expect(slugify("!!!")).toBe("");
  });
});