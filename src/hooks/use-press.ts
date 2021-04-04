import useMethod from './use-method';

type Callback<Args extends never[], Result> = (...args: Args) => Result;

export default function usePress<Args extends never[], Result>(
  callback: Callback<Args, Result>,
): (...args: Args) => Result {
  return useMethod(callback);
}
