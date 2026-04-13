export function getHeroImage(name: string) {
  const overrides: Record<string, string> = {
    "Popol and Kupa": "popol.jpg",
  }

  if (overrides[name]) {
    return `/heroes/${overrides[name]}`
  }

  const fileName = name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/'/g, "")
    .replace(/\s+/g, "-")

  return `/heroes/${fileName}.jpg`
}