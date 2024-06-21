/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > View on GitHub: https://tsch.js.org/612
*/
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

/* _____________ Your Code Here _____________ */
// 1. 메모리 없이 recursive
type KebabCase<S extends string> = S extends `${infer A}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<A>}${KebabCase<R>}`
    : `${Lowercase<A>}-${KebabCase<R>}`
  : S;

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>,
];
// 2. 메모리를 사용해서 recursive

type IsUpperLetter<S extends string> =
  S extends Uppercase<S> ? (S extends Lowercase<S> ? false : true) : false;

// type KebabCase<S extends string, M = true> = S extends `${infer A}${infer B}`
//   ? A extends UpperLetter
//     ? M extends true
//       ? `${Lowercase<A>}${KebabCase<B, false>}`
//       : `-${Lowercase<A>}${KebabCase<B, false>}`
//     : `${A}${KebabCase<B, false>}`
//   : S;

type RemoveFirstHyphen<S extends string> = S extends `-${infer U}`
  ? U extends ""
    ? S
    : U
  : S;
//
// type Kebab<S extends string> = S extends `${infer A}${infer B}`
//   ? IsUpperLetter<A> extends true
//     ? `-${Lowercase<A>}${Kebab<B>}`
//     : `${Lowercase<A>}${Kebab<B>}`
//   : S;
//
// type KebabCase<S extends string> = RemoveFirstHyphen<Kebab<S>>;

// type KebabCase<S extends string, M extends string = ""> = RemoveFirstHyphen<
//   S extends `${infer A}${infer R}`
//     ? IsUpperLetter<A> extends true
//       ? KebabCase<R, `${M}-${Lowercase<A>}`>
//       : KebabCase<R, `${M}${A}`>
//     : M
// >;

type Test = KebabCase<"FooBarBaz">;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/
