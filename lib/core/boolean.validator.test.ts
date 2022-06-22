import { expect, test } from "vitest";
import { booleanValidator } from "./boolean.validator";

const { validate } = booleanValidator;

const key = "isAdmin";

test("validate raises an error when `schemaInfo` is invalid", () => {
  expect(() =>
    validate({ key, schemaInfo: { type: "number" }, target: false })
  ).toThrowError("schemaInfo.type must be boolean here.");
});

test("validate returns errors when target is not expected type", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "boolean",
    },
    target: undefined,
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(`typeof isAdmin must be boolean`);
});

test("validate returns blank array when target is valid", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "boolean",
    },
    target: true,
  });

  expect(errors).toHaveLength(0);
});
