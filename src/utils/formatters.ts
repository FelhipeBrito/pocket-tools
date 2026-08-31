export function parseNumberInput(value: string): number | null {
  const compact = value.trim().replace(/\s/g, '');

  if (!compact) {
    return null;
  }

  const commaCount = (compact.match(/,/g) ?? []).length;

  if (commaCount > 1) {
    return null;
  }

  const normalized = compact.includes(',')
    ? compact.replace(/\./g, '').replace(',', '.')
    : compact;

  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
