/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #union #string

  ### Question

  Implement the String to Union type. Type take string argument. The output should be a union of input letters

  For example

  ```ts
  type Test = "123"
  type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
  ```

  > View on GitHub: https://tsch.js.org/531
*/

/* _____________ Your Code Here _____________ */

// 1
// 먼저 Best Solution 부터 볼까요?
type StringToUnion1<S extends string> = S extends `${infer H}${infer R}`
  ? H | StringToUnion1<R>
  : never;
// 간단하게 첫글자 | 나머지 글자를 Union 재귀적으로 돌리는 가장 직관적일 해법인 것 같아요.

// 2
// 그런데 Generic 변수를 하나 더 할당하여 메모리를 사용해서 풀 수도 있을 것 같아요.
type StringToUnion2<
  S extends string,
  K = never,
> = S extends `${infer H}${infer R}` ? StringToUnion2<R, K | H> : K;
// K 는 쌓아 올릴 결과 타입인데 Union 이 하나도 없는 것부터 시작해야 하잖아요?
// 하나도 없는 Union 은 never 라고 얘기했지요? 그리고 never 는 공집합 이라는 뜻이니까 직관적으로도 맞구요.
// 그리고 never 로 초기화 된 K 제네릭을 재귀를 돌 때 K 에 | Head 를 Union 으로 연결해 줌으로써 하나씩 K 의 Union 이 never 에서부터 H 만큼 범위가 증가한다는 직관도 느낄 수 있으면 좋을 것 같아요.
// 이렇게 초기화된 제네릭을 메모리로 재귀루프를 돌린다는 건 확실히 타입스크립트 흥미로운 관점인것 같아요.

// 3
// 또 다음처럼 재미있게도 해 볼 수 있어요. 여러분.
type ToFlatObject<O extends Object> = {
  [Key in keyof O]: O[Key];
};

type StringToObject<
  S extends string,
  Result extends Object = {},
> = ToFlatObject<
  S extends `${infer H}${infer R}`
    ? StringToObject<R, Result & { [K in H]: unknown }>
    : Result
>;

type StringToUnion3<S extends string> = keyof StringToObject<S>;
// Keyof 아시지요?
// 객체 타입을 편하게 돌릴 때 { [ K in keyof T ] : T[K] } 는 거의 이제 속에 익으시지요? 여기서 __ in __ 문법에서 뒤에 오는 것이 바로 Union 들이 들어와야 한다고 했지요?
// 즉, keyof T 는 T 객체의 key 들을 Union 으로 연결해 준다는 것을 우리는 알고 있어요~
// 다시 말해, 이 관점에서 문제를 바라보면 "hello" 라는 string 을 { h: unknown, e: unknown, l: unknown ... } 이라는 객체로 컨버팅 해서, keyof 를 찍어도 될거라는 것을 예상할 수 있어요.
// keyof 는 어떤 객체의 key 들을 Union 으로 뱉어주니까요!

// 4
// 또 또 ~ 재미있게도 할 수 있어요. 여러분.
// Array 타입에 [number] 로 하면 number 가 자동으로 모든 index 들을 돌려서 배열의 요소들을 Union 으로 연결해 준다는 것 아시지요?
// 예를 들면 ['a', 'b', 'c'][number] 는 'a' | 'b' | 'c' 가 되는거 말이에요~
type StringToArray<
  S extends string,
  Result extends string[] = [],
> = S extends `${infer H}${infer R}`
  ? StringToArray<R, [...Result, H]>
  : Result;
type StringToUnion4<S extends string> = StringToArray<S>[number];
// 먼저 String 을 Array 로 컨버팅 하고 나서 [number] 로 인덱싱만 해주면 되는 거죠~\

// 즐거운 타 타 타 타입스크립트~ ♫

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StringToUnion1<"">, never>>,
  Expect<Equal<StringToUnion1<"t">, "t">>,
  Expect<Equal<StringToUnion1<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion1<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >,
  Expect<Equal<StringToUnion2<"">, never>>,
  Expect<Equal<StringToUnion2<"t">, "t">>,
  Expect<Equal<StringToUnion2<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion2<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >,
  Expect<Equal<StringToUnion3<"">, never>>,
  Expect<Equal<StringToUnion3<"t">, "t">>,
  Expect<Equal<StringToUnion3<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion3<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >,
  Expect<Equal<StringToUnion4<"">, never>>,
  Expect<Equal<StringToUnion4<"t">, "t">>,
  Expect<Equal<StringToUnion4<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion4<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/531/answer
  > View solutions: https://tsch.js.org/531/solutions
  > More Challenges: https://tsch.js.org
*/
