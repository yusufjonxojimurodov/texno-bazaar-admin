export function cleanNumber(value: string): string {
  return value?.replace(/[^0-9]/g, "");
}

export function formatPhoneNumber(e: Event): string | undefined {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;

  let value = target.value;
  if (!value) return;

  const v = cleanNumber(value);
  const l = v.length;

  let lastValue: string | undefined;

  if (l < 3) {
    const reg = new RegExp(`^([0-9]{2})`);
    lastValue = v.replace(reg, "$1");
  } else if (l < 6) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{${l - 2}})`);
    lastValue = v.replace(reg, "$1 $2");
  } else if (l < 8) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{${l - 5}})`);
    lastValue = v.replace(reg, "$1 $2-$3");
  } else {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{${l - 7}})`);
    lastValue = v.replace(reg, "$1 $2-$3-$4");
  }

  target.value = lastValue ?? v;
  return lastValue;
}

export function formatPhoneNumberString(value: string): string {
  if (!value) return "";

  let v = value.replace(/[^0-9]/g, "");

  if (v.startsWith("998")) {
    v = v.slice(3);
  }

  const l = v.length;

  if (l <= 2) return v;
  if (l <= 5) return `${v.slice(0, 2)} ${v.slice(2)}`; 
  if (l <= 7) return `${v.slice(0, 2)} ${v.slice(2, 5)} ${v.slice(5)}`; 
  return `${v.slice(0, 2)} ${v.slice(2, 5)} ${v.slice(5, 7)} ${v.slice(7, 9)}`; 
}

export const normalizePhone = (phone: string) => {
  if (!phone) return ''

  let digits = phone.replace(/\D/g, '')

  if (!digits.startsWith('998')) {
    digits = '998' + digits
  }

  return `+${digits}`
}
