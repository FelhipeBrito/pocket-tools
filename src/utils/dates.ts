const MILLISECONDS_PER_DAY = 86_400_000;
const AVERAGE_DAYS_PER_MONTH = 365.2425 / 12;

export type DateDifferenceResults = {
  days: number;
  approximateWeeks: number;
  approximateMonths: number;
};

export function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function parseDateInput(value: string): number | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (year < 1900 || year > 9999) {
    return null;
  }

  const timestamp = Date.UTC(year, month - 1, day);
  const parsedDate = new Date(timestamp);

  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
}

export function calculateDateDifference(
  initialTimestamp: number,
  finalTimestamp: number,
): DateDifferenceResults {
  const days = Math.round(
    (finalTimestamp - initialTimestamp) / MILLISECONDS_PER_DAY,
  );

  return {
    days,
    approximateWeeks: days / 7,
    approximateMonths: days / AVERAGE_DAYS_PER_MONTH,
  };
}
