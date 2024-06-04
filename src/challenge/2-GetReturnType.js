"use strict";
/*
  2 - Get Return Type
  -------
  by Anthony Fu (@antfu) #medium #infer #built-in

  ### Question

  Implement the built-in `ReturnType<T>` generic without using it.

  For example

  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

  type a = MyReturnType<typeof fn> // should be "1 | 2"
  ```

  > View on GitHub: https://tsch.js.org/2
*/
exports.__esModule = true;
var fn = function (v) { return (v ? 1 : 2); };
var fn1 = function (v, w) { return (v ? 1 : 2); };
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2/answer
  > View solutions: https://tsch.js.org/2/solutions
  > More Challenges: https://tsch.js.org
*/
/*
type MyReturnType<T extends Function> = T extends (...param: any) => infer U
  ? U
  : never;
 */
