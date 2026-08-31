export type CompoundInterestResults = {
  investedAmount: number;
  interestAmount: number;
  finalAmount: number;
};

export function calculateCompoundInterest(
  initialCapital: number,
  monthlyContribution: number,
  monthlyRatePercent: number,
  months: number,
): CompoundInterestResults {
  const monthlyRate = monthlyRatePercent / 100;
  const investedAmount = initialCapital + monthlyContribution * months;

  if (monthlyRate === 0) {
    return {
      investedAmount,
      interestAmount: 0,
      finalAmount: investedAmount,
    };
  }

  const growthFactor = (1 + monthlyRate) ** months;
  const initialCapitalFutureValue = initialCapital * growthFactor;
  const contributionsFutureValue =
    monthlyContribution * ((growthFactor - 1) / monthlyRate);
  const finalAmount = initialCapitalFutureValue + contributionsFutureValue;

  return {
    investedAmount,
    interestAmount: Math.max(0, finalAmount - investedAmount),
    finalAmount,
  };
}
