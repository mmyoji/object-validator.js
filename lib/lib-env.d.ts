type StringType = "string";
type NumberType = "number";
type BooleanType = "boolean";
type SupportedType = StringType | NumberType | BooleanType;

interface StringSchema {
  type: StringType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  // pattern?: RegExp
}

interface NumberSchema {
  type: NumberType;
  required?: boolean;
  min?: number;
  max?: number;
}

interface BooleanSchema {
  type: BooleanType;
  required?: boolean;
}

type SchemaInfo = StringSchema | NumberSchema | BooleanSchema;

export interface Schema {
  [key: string | symbol]: SchemaInfo;
}

export interface ValidationError {
  key: string;
  message: string;
}

export type ValidatorFunc<Args extends object> = (
  obj: Args
) => ValidationError[];

export type InternalValidatorFunc = (args: {
  key: string;
  target: unknown;
  schemaInfo: SchemaInfo;
}) => ValidationError[];
