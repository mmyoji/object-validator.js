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

interface Schema {
  [key: string | symbol]: SchemaInfo;
}

interface ValidationError {
  key: string;
  message: string;
}

type ValidatorFunc<Args extends object> = (obj: Args) => ValidationError[];

type InternalValidatorFunc = (args: {
  key: string;
  target: unknown;
  schemaInfo: SchemaInfo;
}) => ValidationError[];
