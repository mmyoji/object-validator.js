import { expect, test } from "vitest";
import { stringValidator } from "./string.validator";

const { validate } = stringValidator;

const key = "name";

test("validate raises an error when `schemaInfo` is invalid", () => {
  expect(() =>
    validate({ key, schemaInfo: { type: "boolean" }, target: "foo" })
  ).toThrowError("schemaInfo.type must be string here.");
});

test("validate returns errors when target is not expected type", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "string",
    },
    target: undefined,
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(`typeof name must be string`);
});

test("validate returns errors when target has invalid minLength", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "string",
      minLength: 3,
    },
    target: "aa",
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(
    `name is too short. It shoud be 3 length at least.`
  );
});

test("validate returns errors when target has invalid maxLength", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "string",
      maxLength: 3,
    },
    target: "aaaa",
  });

  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe(key);
  expect(error.message).toBe(`name is too long. It shoud be 3 length at most.`);
});

test("validate returns blank array when target is valid", () => {
  const errors = validate({
    key,
    schemaInfo: {
      type: "string",
      minLength: 1,
      maxLength: 3,
    },
    target: "aaa",
  });

  expect(errors).toHaveLength(0);
});
