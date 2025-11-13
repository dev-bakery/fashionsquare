const numberFormat = (number: number | string | null | undefined) => {
  if (number == null) return '';
  if (typeof number === 'string') number = Number(number);
  if (isNaN(number)) return '';

  return number.toLocaleString('en-US', { maximumFractionDigits: 0 });
};
export default numberFormat;
