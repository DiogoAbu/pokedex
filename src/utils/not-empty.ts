export default function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) {
    return false;
  }
  // @ts-ignore
  const testDummy: TValue = value;
  return true;
}
