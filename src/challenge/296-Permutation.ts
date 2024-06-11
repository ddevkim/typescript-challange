/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #medium #union

  ### Question

  Implement permutation type that transforms union types into the array that includes permutations of unions.

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > View on GitHub: https://tsch.js.org/296
*/

/* _____________ Your Code Here _____________ */
// Distributive Conditional Type https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

// Union 의 조건부 분배 특성
type Dist<T> = T extends any ? T[] : never;

// string[] | number[]

type E = Dist<string | (number | (3 | ("k" | "o") | "sss") | "ddd")>;

type AAA = string | never; // string
type BBB = string & never; // never

type CCC = string & (string | symbol); // any
type DDD = string & any; // string
type EEE = never | any; // any
type FFF = never & any; // never

// const k: CCC = Symbol("sss");

type Ex = Dist<"A" | "B" | never>;

// Union 의 조건부 분배에서 never 타입은 어떻게 동작되는가.
type DistCond<T> = T extends any ? T : any;
type Ex2 = DistCond<never | "a">;
type Ex3 = DistCond<never | ("a" | never) | ("b" | never) | "c">;

// 강제로 never 를 union 분배에 참여시키고 싶다면?
// - never 인지를 판단할 수 있어야 한다.
// - 그럼 어떻게 never 인가를 판단할 수 있을까?
// - https://ui.toast.com/posts/ko_20220323 (never 타입에 대해)
type NaiveNever<T> = T extends never ? true : false;
type Ex4 = NaiveNever<never>;

type CorrectNever<T> = T[] extends never[] ? true : false;
type Ex5 = CorrectNever<never>;

type ForcedDistCond<T> = [T] extends [never] ? "hello" : T;
type Ex6 = ForcedDistCond<"a" | "b" | never>;

type Ex7 = ForcedDistCond<never>;
type Ex8 = ForcedDistCond<never | ("a" | never) | ("b" | never) | "c">;

// T extends T ?
type DD1<T> = T extends any ? T[] : any;
type DD2<T> = T extends T ? T[] : any;
type DD3<T> = T[];

// Item = "A" | "B" | "C"
type Permutation1<Union, Item = Union> = [Union] extends [never]
  ? []
  : Item extends any
    ? [Item, ...Permutation<Exclude<Union, Item>>]
    : never;

// loop union
type LoopUnion<U extends string, I extends string = U> = I extends I
  ? `loop ${I}`
  : never;

// Solution
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/
