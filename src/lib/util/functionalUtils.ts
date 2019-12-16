const reducer = <T>(result: T, nextFunction: (argument: T) => T) => nextFunction(result);

export function pipe<T>(...functions: Array<(a: T) => T>): (a: T) => T {
  return (input: T) => functions.reduce(reducer, input);
}
