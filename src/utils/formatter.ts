export default function formatToLocale(
  locale: string,
  number: number
) {
  return Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(number);
}

