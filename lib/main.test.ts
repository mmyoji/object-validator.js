import { expect, test } from "vitest";
import { initValidator } from "./main";

test("initValidator", () => {
  const result = initValidator({});
  expect(result).toBe("object");
});
