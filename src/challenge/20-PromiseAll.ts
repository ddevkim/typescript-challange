/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

// T[number]

// array -> tuple
// awaited Promise<infer U> ->
// Array -> { []:  }

declare function PromiseAll<T extends any[]>(
  values: [...T],
): Promise<{
  [K in keyof T]: Awaited<T[K]>;
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/

/*

async function foo() {
  return "hello, I'm Promise";
}

type f = Awaited<ReturnType<typeof foo>>;



declare function PromiseAll<T extends any[]>(
  values: Readonly<[...T]>,
): Promise<{
  [K in keyof T]: Awaited<T[K]>;
}>;

type MyAwaited<T> = T extends Promise<infer U> ? U : T;

function goo<T extends any[]>(arr: [...T]) {
  return arr;
}

const g1 = goo([1, 2, 3]);

const pro1 = Promise.resolve(1);
const pro2 = Promise.resolve("hello" as const);
const pro3 = Promise.resolve(true);

const allPromises1 = Promise.all([5, pro1, pro2, pro3]);
const allPromises2 = PromiseAll([5, pro1, pro2, pro3]);

*/
