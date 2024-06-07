/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

  For example

  ```ts
  type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */
type WhiteSpace = " " | "\n" | "\r" | "\t";

type TrimLeft<S extends string> = S extends `${WhiteSpace}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

type TrimRight<S extends string> = S extends `${infer Rest}${WhiteSpace}`
  ? TrimRight<Rest>
  : S;

type Trim1<S extends string> = TrimRight<TrimLeft<S>>;

type Trim<S extends string> = S extends
  | `${WhiteSpace}${infer Rest}`
  | `${infer Rest}${WhiteSpace}`
  ? Trim<Rest>
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/

/*
type WhiteSpace = `\n` | "\t" | " ";

type TrimLeft<S extends string> = S extends `${WhiteSpace}${infer R}`
  ? TrimLeft<R>
  : S;

type TrimRight<S extends string> = S extends `${infer L}${WhiteSpace}`
  ? TrimRight<L>
  : S;

type Trim2<S extends string> = TrimRight<TrimLeft<S>>;
type Trim<S extends string> = S extends
  | `${WhiteSpace}${infer Rest}`
  | `${infer Rest}${WhiteSpace}`
  ? Trim<Rest>
  : S;

 */
