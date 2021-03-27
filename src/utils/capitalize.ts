export default function capitalize(text?: string, eachWord?: boolean): string | undefined {
  if (!text) {
    return text;
  }
  if (eachWord) {
    return text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}
