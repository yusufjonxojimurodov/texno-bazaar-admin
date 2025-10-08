export function formatPhoneNumber(value: string): string {
  if (!value) return "";

  const hasPlus = value.startsWith("+");
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("998")) {
    digits = digits.slice(0, 12);
  } else if (digits.length > 9) {
    digits = digits.slice(0, 9);
  }

  let formatted = "";

  if (digits.startsWith("998")) {
    formatted = `${hasPlus ? "+" : ""}${digits.slice(0, 3)} `;
    if (digits.length > 3) formatted += `(${digits.slice(3, 5)}) `;
    if (digits.length > 5) formatted += `${digits.slice(5, 8)}`;
    if (digits.length > 8) formatted += ` ${digits.slice(8, 10)}`;
    if (digits.length > 10) formatted += ` ${digits.slice(10, 12)}`;
  } else {

    formatted = digits;
  }

  return formatted.trim();
}
