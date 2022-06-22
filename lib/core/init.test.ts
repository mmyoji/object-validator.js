import { expect, test } from "vitest";
import { init } from "./init";

type ObjectType = {
  name: string;
  isAdmin?: boolean;
};

const validate = init<ObjectType>({
  name: {
    type: "string",
    required: true,
    minLength: 3,
  },
  isAdmin: {
    type: "boolean",
  },
});

test("init returns validate function", () => {
  expect(typeof validate).toBe("function");
});

// NOTE: This test isn't required when you use TypeScript, but can happen for JavaScript users.
test("validate function returns errors when required key doesn't exist", () => {
  // @ts-ignore
  const errors = validate({ isAdmin: true });

  expect(Array.isArray(errors)).toBe(true);
  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe("name");
  expect(error.message).toBe(`name must be defined`);
});

test("validate function returns errors when target obj violates rules", () => {
  const errors = validate({ name: "n" });

  expect(Array.isArray(errors)).toBe(true);
  expect(errors).toHaveLength(1);
  const [error] = errors;
  expect(error.key).toBe("name");
  expect(error.message).toBe(
    `name is too short. It shoud be 3 length at least.`
  );
});

test("validate function returns a blank array when target obj is valid", () => {
  const errors = validate({ name: "John", isAdmin: false });

  expect(Array.isArray(errors)).toBe(true);
  expect(errors).toHaveLength(0);
});
