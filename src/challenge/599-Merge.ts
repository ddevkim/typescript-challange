/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

// 1
// Best Solution 은 아래 정의인 것 같아요.
type ToFlatObject<T extends Object> = {
  [K in keyof T]: T[K];
};
type Merge1<A extends Object, B extends Object> = ToFlatObject<
  Omit<A, keyof B> & B
>;
// 뒤에 오는 객체 B 가 앞의 A 객체의 key value 를 덮어써야 하므로,
// 먼저 들어온 객체 제네릭인 A 는 B 의 key 를 Omit 해서 먼저 담아요.
// 그런 다음에 B 를 & intersection 으로 연결해 주면 합쳐지게 되지요~
// 그런데, 그냥 Omit<A, keyof B> & B 만 쓰게 되면 답을 통과하지 못합니다.
// 아직 clear 하게 이해되진 못했지만, intersection 으로 엮인 객체는 !== literal 로 선언된 객체와 다르다고 typescript 는 평가하죠! WTF!
// 그래서 ToFlatObject 를 한번 태워서 단일 객체로 한번 담궜다 빼야 합니다.

// 2
// 또 다른 방법으로 Mapped key 를 사용해서 하나의 객체로 한방에 묶어낼 수도 있어요.
// 다시 한번 복습! https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
type Merge2<A extends Object, B extends Object> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
      ? A[K]
      : never;
};
// 여기서 mapped type 의 __ in __ 뒤쪽에는 Union 이 오는 거라고 했지요! 그리고 keyof 는 객체 의 key 들을 union 을 뽑아주기 때문에 딱 맞구요!
// 그런데 객체 A 와 객체 B 의 모든 key 를 union 으로 연결해야 하기 때문에 keyof A 와 keyof B 를 Union 으로 쓰면 주루룩~ 다 연결되게 되겠지요~!
// 그리고 키의 값을 찍을 때 K 가 keyof A 인지 검사하는 것보다 keyof B 인지 검사하는 것을 반드시 먼저 적어야 합니다. 왜냐하면 B 의 키밸류에 우선순위가 있기 때문이지요~
// 또한 한가지 더!
// 어제 Slack 에서 올린 질문이 이 문제를 통해서 자연스럽게 해결되었는데요~
// 왜 아래처럼 하면 통과를 하지 못하느냐에 대해 생각해 볼 필요가 있어요.
/*
    type Merge2<A extends Object, B extends Object> = {
      [K in keyof A | keyof B]: K extends keyof B ? B[K] : A[K]
    };
* */
// K 는 A 와 B 객체의 키 들입니다. 그럼 그 뒤에 값을 뽑아내는 로직을 보면 K 키가 B 의 키가 아니면, A 의 키 일 것이다! 너무 당연해 보이지 않나요?
// 그런데 타입스크립트는 다음과 같은 에러를 뿜어버려요. Type K cannot be used to index type A. 아니 K 가 A 의 인덱스가 될 수 없다니...ㅠ
// 분명 K 는 A 와 B 의 키들의 조합이라고 선언되었고, 그럼 K 가 B 의 키가 아니라면 A 의 키가 될 터인데, A 의 키도 아니라고 주장한다면 대체 어떻게 해란 말이더냐. 타입스크립트야.
// 그래서 우리가 기억해야 하는 것이 하나 생겨요.
// 타입스크립트는 자바스크립트처럼 추론을 완벽하게 논리적으로 하지 않는다!
// 즉, 위의 예제처럼, 유니온으로 선언되었더라도 A 가 아니라면 B 가 될 것이라는 추론을 타입스크립트는 하지 않는다는 것이에요.
// 아래 예제를 한번 보세요~
/*
type A = number | string;
type Test = A extends number
  ? Expect<Equal<A, number>>
  : Expect<Equal<A, string>>;
* */
// A 를 number 나 string 의 union 으로 선언해 놓았어요.
// 그럼 A 가 number 타입이라면 number 일거고 (이건 너무 당연!) 그 반대 조건은 string 이라고 직관적인 논리가 형성되지요?
// 여기서 스탑! 해야합니다. number 가 아니라면 string 이 아니라 타입스크립트가 추론하지 않는다! 가 맞습니다.
// 즉, typescript 는 Explicit (명시적으로!) 하게 타입을 좁혀줄 때 정확하게 추론을 한다는 것이에요.
// TypeScript does not automatically assume that if a type does not extend one type, it extends another. It requires explicit checks. In your case, you need to tell TypeScript explicitly how to handle the scenario when P is not a key in S. Without this, TypeScript cannot infer the type of P in F.
// 그래서 다음처럼 써야 컴파일 에러를 통과합니다.
/*
type A = number | string;
type Test = A extends number
  ? Expect<Equal<A, number>>
  : A extends string
    ? Expect<Equal<A, string>>
    : never;
 */
// 그럼 이제 Merge2 정의가 왜 귀찮게시리 K 가 B 의 키냐 물은 다음 바보처럼 또 그럼 K 가 A 의 키냐 묻는지 아시겠지요?
// 혹은 그냥 머리 속으로 이렇게도 생각해 보았는데 이것도 말이 안되는 해석은 아닌것 같아요. (안되는 것 맞으나, 이유를 좀 더 쉽게 생각할 수 있게 해줌)
// never 는 가장 작은 공집합인거잖아요?
// 그러니 우리가 union 타입을 정의할 때 type U = number | string 이라는 것은 U = number | string | never 처럼 never 가 항상 뒤에 숨어 있다고 생각해도 무방하지요.
// 모든 집합의 부분집합은 공집합이다 가 참인 명제이니까요.
// 비유적으로 1 = 1 + 0, 9 = 9 + 0 인 것과도 같은 거지요.
// 그러니 위의 예제에서 A extends number ? ___ : ___ 의 뒤 쪽이 number 만 걸렀지 사실 그게 string 인지 never 인지까지도 판단할 수 없다는 거지요. (그러나 union 에 never 는 체킹하지 않으므로 말은 안되는 것 같음)
// 그래서 string 을 한번 더 좁혀 줘야지 통과할 수 있다고 해석해도 되는 것 같아요~
// 이상~~ 타입 뿅!

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge1<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >,
  Expect<
    Equal<
      Merge2<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/
