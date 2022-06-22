import { expect, test } from "vitest";
import { isObject } from "./is-object";

test("isObject return false with `null`", () => {
  expect(isObject(null)).toBe(false);
});

test("isObject return false with `undefined`", () => {
  expect(isObject(undefined)).toBe(false);
});

test("isObject return false with `NaN`", () => {
  expect(isObject(NaN)).toBe(false);
});

test("isObject return false with number", () => {
  expect(isObject(0)).toBe(false);
  expect(isObject(1)).toBe(false);
});

test("isObject return false with string", () => {
  expect(isObject("")).toBe(false);
  expect(isObject("foo")).toBe(false);
});

test("isObject return false with boolean", () => {
  expect(isObject(true)).toBe(false);
  expect(isObject(false)).toBe(false);
});

test("isObject return false with Array", () => {
  expect(isObject([])).toBe(false);
  expect(isObject([0])).toBe(false);
});

test("isObject return true with object", () => {
  expect(isObject({})).toBe(true);
  expect(isObject({ foo: "bar" })).toBe(true);
});
