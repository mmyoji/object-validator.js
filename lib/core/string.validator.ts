import type { InternalValidatorFunc, ValidationError } from "lib/lib-env";

const validate: InternalValidatorFunc = ({ key, schemaInfo, target }) => {
  if (schemaInfo.type !== "string") {
    throw new Error("schemaInfo.type must be string here.");
  }

  const errors: ValidationError[] = [];

  const { minLength, maxLength } = schemaInfo;

  if (typeof target !== "string") {
    errors.push({ key, message: `typeof ${key} must be string` });
    return errors;
  }

  if (typeof minLength === "number" && target.length < minLength) {
    errors.push({
      key,
      message: `${key} is too short. It shoud be ${minLength} length at least.`,
    });
  }

  if (typeof maxLength === "number" && target.length > maxLength) {
    errors.push({
      key,
      message: `${key} is too long. It shoud be ${maxLength} length at most.`,
    });
  }

  return errors;
};

export const stringValidator = {
  validate,
};
