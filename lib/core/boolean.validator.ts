const validate: InternalValidatorFunc = ({ key, schemaInfo, target }) => {
  if (schemaInfo.type !== "boolean") {
    throw new Error("schemaInfo.type must be boolean here.");
  }

  const errors: ValidationError[] = [];

  if (typeof target !== "boolean") {
    errors.push({ key, message: `typeof ${key} must be boolean` });
    return errors;
  }

  return errors;
};

export const booleanValidator = {
  validate,
};
