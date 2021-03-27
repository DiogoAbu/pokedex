export default function getIdFromUrl(url: string): number {
  const fullUrl = url.endsWith('/') ? url : url + '/';
  const parts = fullUrl.split('/');
  return parseInt(parts[parts.length - 2], 10);
}
