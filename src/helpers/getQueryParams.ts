export default function getQueryParams(dict: { [key: string]: any }) {
  return Object.entries(dict)
    .filter(([key, val]) => val)
    .map(([key, val]) => `&${key}=${val}`)
    .join("");
}
