/* _____________ Your Code Here _____________ */
type ConcatAll<T extends any[][]> = T extends [
  infer Head extends any[],
  ...infer Rest extends any[],
]
  ? [...Head, ...ConcatAll<Rest>]
  : [];

type Foo = ConcatAll<[[1], [2], [3]]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ConcatAll<[[1], [2], [3]]>, [1, 2, 3]>>,
  Expect<Equal<ConcatAll<[[1, 2], [3], [4]]>, [1, 2, 3, 4]>>,
  Expect<Equal<ConcatAll<[[1, 2], [3, 4], [5]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<ConcatAll<[[1, 2], [3, 4], []]>, [1, 2, 3, 4]>>,
  Expect<Equal<ConcatAll<[["1"]]>, ["1"]>>,
  Expect<Equal<ConcatAll<[["1"], [2], [true]]>, ["1", 2, true]>>,
  Expect<Equal<ConcatAll<[[], [2], [true]]>, [2, true]>>,
  Expect<Equal<ConcatAll<[[undefined], [null], []]>, [undefined, null]>>,
];
