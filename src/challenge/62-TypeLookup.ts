/*
  62 - Type Lookup
  -------
  by Anthony Fu (@antfu) #medium #union #map

  ### Question

  Sometimes, you may want to look up a type in a union by its attributes.

  In this challenge, we would like to get the corresponding type by searching for the common `type` field in the union `Cat | Dog`. In other words, we will expect to get `Dog` for `LookUp<Dog | Cat, 'dog'>` and `Cat` for `LookUp<Dog | Cat, 'cat'>` in the following example.

  ```ts
  interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }

  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
  ```

  > View on GitHub: https://tsch.js.org/62
*/

/* _____________ Your Code Here _____________ */

type LookUp2<Data, Type> = Data extends { type: Type } ? Data : never;

type LookUp3<Data extends { type: string }, Type> = Data extends Data
  ? Data["type"] extends Type
    ? Data
    : never
  : never;

type MyLookUp<Data, Key extends string> = {
  [Type in Key]: Data extends { type: Type } ? Data : never;
}[Key];

type LookUp<Data, Key extends string> = {
  [Type in Key]: Data extends { type: Type } ? Data : never;
}[Key];

// type LookUp<Data, Type> = {
//   [K in keyof Data]: Type extends Data[K] ? Data : never;
// }[keyof Data];

type Ex = LookUp<Animal, "Hound">;

type Test = "a" extends "a" | "b" | "c" ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type Foo = "cat" | "dog" extends "dog" | "cat" | "whale" ? true : false;

const f: Foo = true;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/62/answer
  > View solutions: https://tsch.js.org/62/solutions
  > More Challenges: https://tsch.js.org
*/

/*


// Best Answer
type LookUp<Data, Key> = Data extends { type: Key } ? Data : never;

type LookUp1Fail<
  Data extends { type: string },
  Key extends string,
> = Data["type"] extends Key ? Data : never;

type LookUp1<
  Data extends { type: string },
  Key extends string,
> = Data extends Data ? (Data["type"] extends Key ? Data : never) : never;
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

// 각 type 의 이름으로 객체를 생성하고 해당 type 의 객체 값을 추출하는 방식
type LookUp2<Data, Key extends string> = {
  [Type in Key]: Data extends { type: Type } ? Data : never;
}[Key];


 */
