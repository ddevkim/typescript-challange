/*
  106 - Trim Left
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

  For example

  ```ts
  type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
  ```

  > View on GitHub: https://tsch.js.org/106
*/

/* _____________ Your Code Here _____________ */

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type WhiteSpace = " " | "\n" | "\r" | "\t";

type TrimLeft<T extends string> = T extends `${WhiteSpace}${infer Rest}`
  ? TrimLeft<Rest>
  : T;

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/106/answer
  > View solutions: https://tsch.js.org/106/solutions
  > More Challenges: https://tsch.js.org
*/

/*

type CharToRemove = " " | "\t" | "\n";

type TrimLeft<S extends string> = S extends `${CharToRemove}${infer Trimmed}`
  ? TrimLeft<Trimmed>
  : S;

type TrimLeft2<S extends string> = S extends ""
  ? S
  : S extends `${infer F}${infer R}`
    ? F extends CharToRemove
      ? TrimLeft<R>
      : `${F}${R}`
    : never;

 */
