export type PercentageResults = {
  percentageValue: number;
  increasedValue: number;
  discountedValue: number;
};

export function calculatePercentageResults(
  value: number,
  percentage: number,
): PercentageResults {
  const percentageValue = value * (percentage / 100);

  return {
    percentageValue,
    increasedValue: value + percentageValue,
    discountedValue: value - percentageValue,
  };
}
