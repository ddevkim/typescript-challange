/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = { [key in K] : T[key] }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Test = MyPick<Todo, 'title' | 'completed'>
type Result = Equal<Expected2, Test>

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/
