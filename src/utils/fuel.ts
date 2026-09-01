export type FuelResults = {
  requiredLiters: number;
  totalCost: number;
  costPerKilometer: number;
};

export function calculateFuelCost(
  distanceKilometers: number,
  consumptionKilometersPerLiter: number,
  fuelPricePerLiter: number,
): FuelResults {
  const requiredLiters =
    distanceKilometers / consumptionKilometersPerLiter;
  const totalCost = requiredLiters * fuelPricePerLiter;

  return {
    requiredLiters,
    totalCost,
    costPerKilometer: totalCost / distanceKilometers,
  };
}
