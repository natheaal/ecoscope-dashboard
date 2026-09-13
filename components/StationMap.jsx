"use client";

import { aqiLevel } from "@/lib/data";

export default function StationMap({ stations, readings, selectedId, onSelect }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#EFEBE1] border border-[#D8D2C2] overflow-hidden">
      <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full">
        <line x1="0" y1="18.75" x2="100" y2="18.75" stroke="#D8D2C2" strokeWidth="0.3" />
        <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="#D8D2C2" strokeWidth="0.3" />
        <line x1="0" y1="56.25" x2="100" y2="56.25" stroke="#D8D2C2" strokeWidth="0.3" />
        <line x1="25" y1="0" x2="25" y2="75" stroke="#D8D2C2" strokeWidth="0.3" />
        <line x1="50" y1="0" x2="50" y2="75" stroke="#D8D2C2" strokeWidth="0.3" />
        <line x1="75" y1="0" x2="75" y2="75" stroke="#D8D2C2" strokeWidth="0.3" />

        {stations.map((s) => {
          const r = readings[s.id];
          const color = r ? aqiLevel(r.currentAqi).color : "#7C9885";
          const isActive = s.id === selectedId;
          return (
            <g
              key={s.id}
              transform={`translate(${s.x}, ${s.y})`}
              onClick={() => onSelect(s.id)}
              className="cursor-pointer"
            >
              {isActive && (
                <circle r="4.2" fill={color} opacity="0.18">
                  <animate attributeName="r" values="3.2;5.2;3.2" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.28;0.05;0.28" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle r={isActive ? "2.1" : "1.5"} fill={color} stroke="#F7F5F0" strokeWidth="0.4" />
            </g>
          );
        })}
      </svg>

      {stations.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-[140%] px-1.5 py-0.5 text-[10px] font-medium tracking-wide whitespace-nowrap transition-opacity ${
            s.id === selectedId
              ? "opacity-100 bg-[#1B2321] text-[#F7F5F0]"
              : "opacity-0 hover:opacity-100 bg-[#1B2321]/90 text-[#F7F5F0]"
          }`}
        >
          {s.name}
        </button>
      ))}

      <div className="absolute bottom-2 left-2 text-[10px] text-[#5B6660] font-medium tracking-wide uppercase">
        Milano — rete di monitoraggio
      </div>
    </div>
  );
}
