"use client";

import { useMemo, useState } from "react";
import { Wind, Droplets, Thermometer, Leaf } from "lucide-react";
import { STATIONS, getStationData } from "@/lib/data";
import StationMap from "@/components/StationMap";
import TrendChart from "@/components/TrendChart";

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState(STATIONS[0].id);

  const readings = useMemo(() => {
    const map = {};
    STATIONS.forEach((s) => {
      map[s.id] = getStationData(s);
    });
    return map;
  }, []);

  const station = STATIONS.find((s) => s.id === selectedId);
  const data = readings[selectedId];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1B2321]">
      <header className="border-b border-[#D8D2C2] px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Leaf size={20} strokeWidth={1.75} className="text-[#0F5257]" />
          <span className="font-medium tracking-tight text-[15px]">EcoScope</span>
        </div>
        <div className="text-xs text-[#5B6660]">Rete civica di monitoraggio ambientale — Milano</div>
      </header>

      <main className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
          {/* Station list */}
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {STATIONS.map((s) => {
              const r = readings[s.id];
              const active = s.id === selectedId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`text-left px-3 py-2.5 border-l-2 shrink-0 transition-colors ${
                    active
                      ? "border-[#0F5257] bg-[#EFEBE1]"
                      : "border-transparent hover:bg-[#EFEBE1]/60"
                  }`}
                >
                  <div className="text-sm font-medium whitespace-nowrap">{s.name}</div>
                  <div className="text-[11px] text-[#5B6660]">
                    {s.zone} · AQI {r.currentAqi}
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-col gap-8">
            {/* Hero */}
            <section className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wide text-[#5B6660] mb-1">
                  {station.name} · {station.zone}
                </div>
                <div className="flex items-baseline gap-3">
                  <span
                    style={{ fontFamily: "var(--font-fraunces)" }}
                    className="text-[76px] leading-none font-light"
                  >
                    {data.currentAqi}
                  </span>
                  <span className="text-sm text-[#5B6660] pb-2">indice qualità dell&apos;aria</span>
                </div>
                <div
                  className="inline-block mt-2 px-2 py-0.5 text-xs font-medium text-[#F7F5F0]"
                  style={{ backgroundColor: data.level.color }}
                >
                  {data.level.label}
                </div>
                <p className="mt-4 text-sm text-[#5B6660] max-w-[34ch]">
                  Ultime 24 ore di rilevazioni dalla stazione selezionata. I dati sono aggiornati ogni ora
                  dai sensori della rete civica.
                </p>
              </div>

              <StationMap
                stations={STATIONS}
                readings={readings}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </section>

            {/* Metric cards */}
            <section className="grid grid-cols-3 gap-px bg-[#D8D2C2] border border-[#D8D2C2]">
              <MetricCard icon={Thermometer} label="Temperatura" value={`${data.currentTemp}°`} />
              <MetricCard icon={Droplets} label="Umidità" value={`${data.currentHumidity}%`} />
              <MetricCard icon={Wind} label="PM2.5" value={`${data.pm25} µg/m³`} />
            </section>

            {/* Trends */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TrendPanel title="Indice qualità dell'aria" data={data.aqiSeries} color="#0F5257" />
              <TrendPanel title="Temperatura (°C)" data={data.tempSeries} color="#E2A83B" unit="°" />
              <TrendPanel title="Umidità (%)" data={data.humiditySeries} color="#7C9885" unit="%" />
            </section>
          </div>
        </div>
      </main>

      <footer className="px-6 md:px-10 py-6 text-[11px] text-[#5B6660] border-t border-[#D8D2C2] mt-4">
        Progetto dimostrativo — dati simulati. Costruito con React e Next.js.
      </footer>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#F7F5F0] p-5">
      <Icon size={16} strokeWidth={1.75} className="text-[#5B6660] mb-3" />
      <div className="text-2xl font-light" style={{ fontFamily: "var(--font-fraunces)" }}>
        {value}
      </div>
      <div className="text-xs text-[#5B6660] mt-0.5">{label}</div>
    </div>
  );
}

function TrendPanel({ title, data, color, unit = "" }) {
  return (
    <div className="border border-[#D8D2C2] p-4">
      <div className="text-xs font-medium text-[#5B6660] mb-1">{title}</div>
      <TrendChart data={data} color={color} unit={unit} />
    </div>
  );
}
