export function isObject(obj: unknown): obj is object {
  return obj != null && !!obj && typeof obj === "object" && !Array.isArray(obj);
}
