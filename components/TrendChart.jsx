"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function CustomTooltip({ active, payload, label, unit }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#1B2321] text-[#F7F5F0] px-3 py-2 text-xs">
      <div className="text-[#9DA89F]">{label}</div>
      <div className="font-semibold">
        {payload[0].value}
        {unit}
      </div>
    </div>
  );
}

export default function TrendChart({ data, color, unit = "" }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <defs>
          <linearGradient id={`fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E2DDCF" strokeDasharray="0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "#5B6660" }}
          axisLine={{ stroke: "#D8D2C2" }}
          tickLine={false}
          interval={5}
        />
        <YAxis tick={{ fontSize: 10, fill: "#5B6660" }} axisLine={false} tickLine={false} width={30} />
        <Tooltip content={<CustomTooltip unit={unit} />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#fill-${color.replace("#", "")})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
