/* _____________ Your Code Here _____________ */
type ToCamelCase<S extends string> = S extends `${infer A}_${infer B}${infer C}`
  ? `${A}${Capitalize<B>}${ToCamelCase<C>}`
  : S;

type ToSnakeCase<S extends string> = S extends `${infer A}${infer B}`
  ? `${A extends Uppercase<A> ? `_${Lowercase<A>}` : A}${ToSnakeCase<B>}`
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ToCamelCase<"hello_world">, "helloWorld">>,
  Expect<Equal<ToCamelCase<"this_is_my_day">, "thisIsMyDay">>,
  Expect<Equal<ToSnakeCase<"helloWorld">, "hello_world">>,
  Expect<Equal<ToSnakeCase<"thisIsMyDay">, "this_is_my_day">>,
  Expect<
    Equal<ToSnakeCase<"helloWorldTodayMyDay">, "hello_world_today_my_day">
  >,
];
