export default function getDisplayName(name?: string): string | undefined {
  let final = name;

  // Remove male or female
  final = name ? name.replace(/(\b-f\b|\b-m\b)$/g, '') : name;

  return final;
}
