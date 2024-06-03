/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */

/*
 - What we'll learn from today's lesson --
    1. Utility type MyOmit 에 대해서 알아본다.
    2. Mapped type 에 대해 알아본다. https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    3. Pick 의 정의에 대해 복습
    4. keyof 가 하는 역할 안다.
    5. Exclude 와 Include 를 사용해 본다.

 */

// type MyOmit2<T, K extends keyof T> = {
//   [ExKey in keyof T as ExKey extends K ? never : ExKey]: T[ExKey];
// };

type MyOmit3<T, K extends keyof T> = {
  [ExKey in Exclude<keyof T, K>]: T[ExKey];
};

// type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Person = {
  name: string;
  age: number;
  gender: "male" | "female";
};

type MyExclude<T, U> = T extends U ? never : T;
type MyInclude<T, U> = T extends U ? T : never;

type MyOmit<T, K extends keyof T> = {
  [ExKey in keyof T as Exclude<ExKey, K>]: T[ExKey];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>,
  Expect<Equal<Expected3, MyOmit<Todo1, "description" | "completed">>>,
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected3 {
  readonly title: string;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/
