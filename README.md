# object-validator

## Installation

```
$ npm install @mmyoji/object-validator
```

## Usage

```ts
import { init } from "@mmyoji/object-validator";

type TargetObject = {
  name: string;
  isAdmin?: boolean;
}

const validate = init<TargetObject>({
  name: {
    type: "string",
    required: true,
    minLength: 3,
  },
  isAdmin: {
    type: "boolean",
  },
});

const errors = validate({
  name: "a",
  isAdmin: true,
})
console.log(errors);
//=> [{key:"name",message:"name is too short. It must be 3 length at least."}]
```
