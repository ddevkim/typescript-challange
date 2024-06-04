"use strict";
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
exports.__esModule = true;
function foo(input) {
    return 3;
}
var A = {
    a: 2,
    b: 2
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
