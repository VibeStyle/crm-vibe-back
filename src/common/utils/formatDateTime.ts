export function formatDateTimeDDMMYYYYAtHHMM(
  input: Date | string | number,
): string {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return '';

  const pad2 = (n: number) => String(n).padStart(2, '0');

  const day = pad2(d.getDate());
  const month = pad2(d.getMonth() + 1);
  const year = d.getFullYear();

  const hours = pad2(d.getHours());
  const minutes = pad2(d.getMinutes());

  return `${day}.${month}.${year} at ${hours}:${minutes}`;
}
