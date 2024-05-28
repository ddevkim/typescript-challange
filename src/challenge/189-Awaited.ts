/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is a wrapped type like Promise, how we can get the type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

/* _____________ Test Cases _____________ */

import type { Equal, Expect } from "@type-challenges/utils";

type MyAwaited<T extends PromiseLike<any>> = Awaited<T>;

type A = Promise<string>;
type B = Promise<{ field: number }>;
type C = Promise<Promise<string | number>>;
type D = Promise<Promise<Promise<string | boolean>>>;
type E = { then: (onfulfilled: (arg: number) => any) => any };

function foo(input: boolean) {
  return 3;
}

type TT = typeof foo;

type Test = MyAwaited<E>;

type cases = [
  Expect<Equal<MyAwaited<A>, string>>,
  Expect<Equal<MyAwaited<B>, { field: number }>>,
  Expect<Equal<MyAwaited<C>, string | number>>,
  Expect<Equal<MyAwaited<D>, string | boolean>>,
  Expect<Equal<MyAwaited<E>, number>>,
];

// @ts-expect-error
type error = MyAwaited<number>;

interface I1 {
  a: number;
}

interface I1 {
  b: number;
}

const A: I1 = {
  a: 2,
  b: 2,
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/

/*
type PromiseThen = {
  then: (onfulfilled: (arg: any) => any) => any;
};

type MyAwaited<T extends PromiseThen> =
  T extends Promise<Promise<Promise<infer U3>>>
    ? U3
    : T extends Promise<Promise<infer U2>>
      ? U2
      : T extends {
            then: (onfulfilled: (arg: infer U) => any) => any;
          }
        ? U
        : never;

type MyAwaitedLike<T> = T extends {
  then: (onfulfilled: (arg: infer U) => any) => any;
}
  ? U
  : never;

type Test2 = MyAwaitedLike<T>;
*/

/*

T extends Promise<infer U> ? U extends Promise<any> ? MyAwaited<U> : U : never

 */
