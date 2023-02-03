export default function formatToLocale(
  locale: string,
  number: number,
  toFixed?: number
) {
  return Intl.NumberFormat(locale, {
    minimumFractionDigits: toFixed || 2,
    maximumFractionDigits: toFixed || 2,
  }).format(number);
}
