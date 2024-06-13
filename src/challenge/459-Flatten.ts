/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

// @ts-ignore
type Flatten1<
  A extends Array<unknown>,
  Result extends Array<unknown> = [],
> = A extends [infer First, ...infer Rest]
  ? First extends Array<unknown>
    ? Flatten1<[...First, ...Rest], Result>
    : Flatten1<Rest, [...Result, First]>
  : Result;

type Flatten<A extends unknown[]> = A extends [infer H, ...infer R]
  ? [...(H extends unknown[] ? Flatten<H> : [H]), ...Flatten<R>]
  : [];

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >,
];

// @ts-expect-error
type error = Flatten<"1">;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
