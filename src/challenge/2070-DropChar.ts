/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer

  ### Question

  Drop a specified char from a string.

  For example:

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */

// 제네릭 메모리를 사용해서
// type DropChar<S extends string, C extends string, R extends string = ""> =
// S extends `${infer A}${infer Rest}` ? A extends C ? DropChar<Rest, C, R> : DropChar<Rest, C, `${R}${A}`> : R;

// 메모리 없이
// type DropChar<S extends string, C extends string> = S extends `${infer A}${infer Rest}` ?
// A extends C ? `${DropChar<Rest, C>}` : `${A}${DropChar<Rest, C>}`
// : S

// 나이스 한 방법
type DropChar<
  S extends string,
  C extends string,
> = S extends `${infer A}${C}${infer Rest}` ? `${A}${DropChar<Rest, C>}` : S;

type Test<
  S extends string,
  C extends string,
> = S extends `${infer A}${C}${infer Rest}` ? Rest : never;

type TT = Test<" butter fly!        ", " ">;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2070/answer
  > View solutions: https://tsch.js.org/2070/solutions
  > More Challenges: https://tsch.js.org
*/
