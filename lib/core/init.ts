import type { Schema, ValidatorFunc, ValidationError } from "../lib-env";

import { isObject } from "../helpers/is-object";
import { booleanValidator } from "./boolean.validator";
import { stringValidator } from "./string.validator";
import { numberValidator } from "./number.validator";

/**
 * init initializes validator function.
 *
 * @param schema {Schema}
 * @returns {ValidatorFunc}
 */
function init<Args extends object>(schema: Schema): ValidatorFunc<Args> {
  return (obj: Args) => {
    if (!isObject(obj)) {
      throw new Error(`passed object is not expected object type`);
    }

    const errors: ValidationError[] = [];

    for (const key in schema) {
      const schemaInfo = schema[key];

      // Presence check
      if (schemaInfo.required && !(key in obj)) {
        errors.push({ key, message: `${key} must be defined` });
      }

      if (!(key in obj)) {
        continue;
      }

      // @ts-ignore
      const target = obj[key];

      const { type } = schemaInfo;
      const args = {
        key,
        schemaInfo,
        target,
      };
      switch (type) {
        case "string": {
          errors.push(...stringValidator.validate(args));
          break;
        }

        case "number": {
          errors.push(...numberValidator.validate(args));
          break;
        }

        case "boolean": {
          errors.push(...booleanValidator.validate(args));
          break;
        }

        default: {
          throw new Error(`${type} is not supported.`);
        }
      }
    }

    return errors;
  };
}

export {
  /**
   * @deprecated use `initValidator` instead
   * @todo Remove this API in v1
   */
  init,

  /**
   * initValidator initializes validator function.
   * @param {Schema} schema
   * @returns {ValidatorFunc}
   */
  init as initValidator,
};
