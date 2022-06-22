import { expect, test } from "vitest";
import { numberValidator } from "./number.validator";

const { validate } = numberValidator;

const key = "count";

test("validate raises an error when `schemaInfo` is invalid", () => {
  expect(() =>
    validate({ key, schemaInfo: { type: "string" }, target: 10 })
  ).toThrowError("schemaInfo.type must be number here.");
});

test("validate returns errors when target is not expected type", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "number",
    },
    target: undefined,
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(`typeof count must be number`);
});

test("validate returns errors when target has invalid min", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "number",
      min: 3,
    },
    target: 2,
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(
    `count is too small. It shoud be greather than or equal to 3.`
  );
});

test("validate returns errors when target has invalid max", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "number",
      max: 10,
    },
    target: 12,
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(
    `count is too large. It shoud be less than or equal to 10.`
  );
});

test("validate returns blank array when target is valid", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "number",
      min: 1,
      max: 3,
    },
    target: 3,
  });

  expect(errors).toHaveLength(0);
});
