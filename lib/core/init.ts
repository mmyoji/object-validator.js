import { isObject } from "../helpers/is-object";
import { booleanValidator } from "./boolean.validator";
import { stringValidator } from "./string.validator";

/**
 * init initializes validator function.
 *
 * @param schema {Schema}
 * @returns {ValidatorFunc}
 *
 * # Example
 *
 * ```ts
 * type ObjectType = {
 *   username: string,
 *   isAdmin?: boolean,
 * }
 *
 * const validate = init<ObjectType>({
 *   username: {
 *     type: "string",
 *     required: true,
 *     minLength: 3,
 *     maxLength: 100,
 *   },
 *   isAdmin: {
 *     type: "boolean",
 *   },
 * });
 *
 * const errors = validate({ username: "ab", isAdmin: true })
 * // [{ key: "username", message: "username is too short. It must be 3 at least." }]
 * ```
 */
export function init<Args extends object>(schema: Schema): ValidatorFunc<Args> {
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
      switch (type) {
        case "string": {
          errors.push(...stringValidator.validate({ key, schemaInfo, target }));
          break;
        }

        case "boolean": {
          errors.push(
            ...booleanValidator.validate({ key, schemaInfo, target })
          );
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
