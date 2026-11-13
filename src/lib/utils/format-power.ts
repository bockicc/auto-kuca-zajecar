export function formatPower(powerKw: number) {
  const horsepower = Math.round(powerKw * 1.35962);

  return `${powerKw} kW (${horsepower} KS)`;
}

export function formatEngine(engineCc: number) {
  return `${new Intl.NumberFormat("sr-Latn-RS").format(engineCc)} cm³`;
}
