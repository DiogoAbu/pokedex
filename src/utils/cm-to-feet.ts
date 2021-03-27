export default function cmToFeet(cm: number): string {
  const realFeet = (cm * 10 * 0.3937) / 12;

  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);

  let inchesString = '';
  if (inches < 10) {
    inchesString = '0' + inches.toString();
  } else {
    inchesString = inches.toString();
  }

  return feet.toString() + "'" + inchesString + "''";
}
