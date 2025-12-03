export function phoneCodeValidator(value: string | null | undefined): boolean {
  if (!value) return false;

  const firstTwo = value.replace(/[-\s]/g, "").slice(0, 2);

  const allowedCodes: string[] = [
    "90",
    "91",
    "88",
    "50",
    "93",
    "94",
    "95",
    "77",
    "99",
    "98",
    "97",
    "20",
    "33",
    "96",
    "61",
  ];

  return allowedCodes.includes(firstTwo);
}
