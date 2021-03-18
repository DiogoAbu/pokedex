import useMethod from './use-method';

type Callback<Args extends any[], Result> = (...args: Args) => Result;

export default function usePress<Args extends any[], Result>(
  callback: Callback<Args, Result>,
): (...args: Args) => Result {
  return useMethod(callback);
}
