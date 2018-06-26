const MS_PER_DAY = 60 * 60 * 24 * 1000;

export function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / MS_PER_DAY);
}

export function shortISO(date) {
  return date.toISOString().split('T')[0];
}

export function veryShortISO(date) {
  try {
    return date.toISOString().split('T')[0].slice(5);
  } catch (e) {
    return 'NaN';
  }
}

export function parseRemoteDateString(date) {
  return date.substring(0, 20).replace('.', 'Z');
}

export function hourMinute(date) {
  return date.toISOString().split('T')[1].slice(0, 5);
}

export function getETA(amount, quota) {
  if (!quota) return new Date();
  const days = Math.max(0, Math.ceil(amount / quota) - 1);
  const target = new Date();
  target.setDate(target.getDate() + days);
  return target;
}

export function prettyTranslation(translation) {
  return translation.replace(/(n)([^.])/g, '\n$2');
}

export function prettyDefinition(definition) {
  return definition.replace(/(n)(.\.)/g, '\n$2');
}
