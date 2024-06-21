/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

// 1. Omit 으로 표현하기
//    1-1. (A U B) - (A X B)
//    1-2. (A - B) U (B - A)

// type Diff<A, B> = FlatObject<Omit<A, keyof B> & Omit<B, keyof A>>;

type FlatObject<T extends Object> = {
  [K in keyof T]: T[K];
};

// 1-1
// type Diff<A, B> = Omit<A & B, keyof (A | B)>;

// 2. Omit 을 사용하지 않고 표현하기
//    2-1. Mapped type 으로 Exclude 를 사용해보기
// type Diff<A, B> = FlatObject<
//   {
//     [K in Exclude<keyof A, keyof B>]: A[K];
//   } & {
//     [K in Exclude<keyof B, keyof A>]: B[K];
//   }
// >;

//    2-2. Key re-mapping 사용해보기
type Diff<A, B> = {
  [K in keyof (A & B) as K extends keyof (A | B) ? never : K]: (A & B)[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
