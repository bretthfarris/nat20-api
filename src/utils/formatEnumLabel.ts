export function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')       // Replace underscores with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize each word
}