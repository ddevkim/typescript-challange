"use strict";
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
exports.__esModule = true;
var my_tuple = ["jaemin", 33];
var promise_tuple = [
    Promise.resolve("jaemin"),
    Promise.resolve(33),
];
promise_tuple[0].then(console.log);
