export default function kgToLbs(kg: number): string {
  const lbs = (kg * 2.2046).toFixed(1);
  return lbs + ' lbs';
}
