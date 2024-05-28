/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

// type Includes<T extends readonly any[], U> = {
//   [K in keyof T]: MyEqual<T[K], U>;
// } extends false[]
//   ? false
//   : true;

type Includes<T extends readonly any[], U> = T extends [
  infer Head,
  ...infer Rest,
]
  ? Equal<Head, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

type Nullable<T> = {
  [key in keyof T]?: T[key] | null;
};

type Pick<T, P extends keyof T> = {
  [Picked_Key in P]: T[Picked_Key];
};

// 그럼 튜플이면?
type ReadonlyTuple<T extends readonly any[]> = {
  readonly [k in keyof T]: T[k];
};

type MyTuple = [string, number];
const my_tuple: ReadonlyTuple<MyTuple> = ["jaemin", 33];

// my_tuple[0] = "kk";

type PromiseTuple<T extends readonly any[]> = {
  [k in keyof T]: Promise<T[k]>;
};

const promise_tuple: PromiseTuple<MyTuple> = [
  Promise.resolve("jaemin"),
  Promise.resolve(33),
];
promise_tuple[0].then(console.log);

type KeyofTuple = keyof MyTuple;

/*
type tuple1 = ['mon', 'tue', 'wed]
const tuple2 = ['mon', 'tue', 'wed] as const

{
  0: 'mon',
  1: 'tue',
  2: 'wed',
  readonly length: 3
}
*/

// 제네릭 조건부 타입?
type EqA<A, B> = A extends B ? (B extends A ? true : false) : false;
type EqB<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <U>() => U extends B ? 1 : 2
    ? true
    : false;

// https://kscodebase.tistory.com/643 Equal 타입 해석

type A1 = EqA<string | number, string>;
type A2 = EqA<string, string | number>;

type B1 = EqB<string | number, string>;
type B2 = EqB<string, string | number>;
