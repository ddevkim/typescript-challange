"use strict";
/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #easy #object-keys

  ### Question

  Given an array, transform it into an object type and the key/value must be in the provided array.

  For example:

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > View on GitHub: https://tsch.js.org/11
*/
var _a;
exports.__esModule = true;
var tuple = ["tesla", "model 3", "model X", "model Y"];
var tupleNumber = [1, 2, 3, 4];
var sym1 = Symbol(1);
var sym2 = Symbol(2);
var tupleSymbol = [sym1, sym2];
var tupleMix = [1, "2", 3, "4", sym1];
var f = (_a = {
        a: 3,
        1: 3
    },
    _a[Symbol("a")] = 23,
    _a);
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/11/answer
  > View solutions: https://tsch.js.org/11/solutions
  > More Challenges: https://tsch.js.org
*/
/*

0. 배열에서 값을 가져오는 방법
   - type[number]

1. Tuple 은 언제 유용할까?
   - 자바스크립트에는 없지만 배열의 타입을 강제하고 싶을 때 (순서까지도!!)
   - 배열로 안전하게 데이터 가공 가능, 구조분해도 안전
   - 그러나 배열조작에서 구멍발견!, 어떻게?

*/
