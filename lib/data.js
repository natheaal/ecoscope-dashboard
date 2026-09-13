// Deterministic mock data generator — no external API needed for the demo.
// Simulates air-quality sensor stations around Milan.

function seededWave(seed, i, base, amplitude, period) {
  const angle = (i / period) * Math.PI * 2 + seed;
  return base + Math.sin(angle) * amplitude + Math.sin(angle * 2.3 + seed) * (amplitude * 0.3);
}

function buildSeries(seed, base, amplitude, hours = 24) {
  return Array.from({ length: hours }, (_, i) => {
    const hour = i;
    const value = seededWave(seed, i, base, amplitude, hours);
    return {
      hour,
      label: `${String(hour).padStart(2, "0")}:00`,
      value: Math.max(0, Math.round(value * 10) / 10),
    };
  });
}

function aqiLevel(aqi) {
  if (aqi <= 50) return { label: "Buona", color: "#0F5257" };
  if (aqi <= 100) return { label: "Moderata", color: "#7C9885" };
  if (aqi <= 150) return { label: "Sensibile", color: "#E2A83B" };
  return { label: "Scarsa", color: "#C1440E" };
}

export const STATIONS = [
  {
    id: "vetra",
    name: "Piazza Vetra",
    zone: "Centro storico",
    x: 46,
    y: 58,
    seed: 1.2,
    aqiBase: 62,
    tempBase: 21,
    humidityBase: 54,
  },
  {
    id: "navigli",
    name: "Navigli",
    zone: "Zona 6",
    x: 38,
    y: 70,
    seed: 2.7,
    aqiBase: 78,
    tempBase: 22,
    humidityBase: 58,
  },
  {
    id: "sempione",
    name: "Parco Sempione",
    zone: "Zona 1",
    x: 40,
    y: 30,
    seed: 0.4,
    aqiBase: 34,
    tempBase: 19,
    humidityBase: 61,
  },
  {
    id: "bicocca",
    name: "Bicocca",
    zone: "Zona 9",
    x: 62,
    y: 14,
    seed: 3.6,
    aqiBase: 55,
    tempBase: 20,
    humidityBase: 50,
  },
  {
    id: "isola",
    name: "Isola",
    zone: "Zona 9",
    x: 55,
    y: 24,
    seed: 4.4,
    aqiBase: 47,
    tempBase: 20,
    humidityBase: 52,
  },
];

export function getStationData(station) {
  const aqiSeries = buildSeries(station.seed, station.aqiBase, 18);
  const tempSeries = buildSeries(station.seed + 1, station.tempBase, 3);
  const humiditySeries = buildSeries(station.seed + 2, station.humidityBase, 8);

  const currentAqi = aqiSeries[aqiSeries.length - 1].value;
  const currentTemp = tempSeries[tempSeries.length - 1].value;
  const currentHumidity = humiditySeries[humiditySeries.length - 1].value;
  const pm25 = Math.round(currentAqi * 0.42 * 10) / 10;

  return {
    aqiSeries,
    tempSeries,
    humiditySeries,
    currentAqi: Math.round(currentAqi),
    currentTemp: Math.round(currentTemp * 10) / 10,
    currentHumidity: Math.round(currentHumidity),
    pm25,
    level: aqiLevel(currentAqi),
  };
}

export { aqiLevel };
