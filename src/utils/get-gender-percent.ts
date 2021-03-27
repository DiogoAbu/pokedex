export default function getGenderPercent(ratioToBeFemale: number): { female: number; male: number } | null {
  if (ratioToBeFemale === -1) {
    return null;
  }

  const female = (100 * ratioToBeFemale) / 8;
  const male = 100 - female;

  return { female, male };
}
