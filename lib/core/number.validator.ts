import type { InternalValidatorFunc, ValidationError } from "lib/lib-env";

const validate: InternalValidatorFunc = ({ key, schemaInfo, target }) => {
  if (schemaInfo.type !== "number") {
    throw new Error("schemaInfo.type must be number here.");
  }

  const errors: ValidationError[] = [];

  const { min, max } = schemaInfo;

  if (typeof target !== "number") {
    errors.push({ key, message: `typeof ${key} must be number` });
    return errors;
  }

  if (typeof min === "number" && target < min) {
    errors.push({
      key,
      message: `${key} is too small. It shoud be greather than or equal to ${min}.`,
    });
  }

  if (typeof max === "number" && target > max) {
    errors.push({
      key,
      message: `${key} is too large. It shoud be less than or equal to ${max}.`,
    });
  }

  return errors;
};

export const numberValidator = {
  validate,
};
