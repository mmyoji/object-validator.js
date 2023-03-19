# object-validator

This is a learn-to-code repo. Please do not use.

Breaking changes are often added during v0.

## Installation

```
$ npm install @mmyoji/object-validator
```

## Usage

```ts
import { init } from "@mmyoji/object-validator";

type TargetObject = {
  name: string;
  age: number;
  isAdmin?: boolean;
};

const validate = init<TargetObject>({
  name: {
    type: "string",
    required: true,
    minLength: 3,
  },
  age: {
    type: "number",
    required: true,
    min: 18,
    max: 65,
  },
  isAdmin: {
    type: "boolean",
  },
});

const errors = validate({
  name: "a",
  count: 22,
  isAdmin: true,
});
console.log(errors);
//=> [{key:"name",message:"name is too short. It must be 3 length at least."}]
```
