import React from "react";
import {
  Legend,
  PolarGrid,
  PolarAngleAxis,
  RadarChart,
  Radar,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    subject: "Math",
    A: 70,
    B: 120,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 140,
    B: 50,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 100,
    B: 50,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 125,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 120,
    fullMark: 150,
  },
];

export default function TestGraph2() {
  return (
    <ResponsiveContainer>
      <RadarChart outerRadius={90} width={730} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#964FFF"
          fill="#964FFF"
          fillOpacity={0.6}
        />
        <Radar
          name="Lily"
          dataKey="B"
          stroke="#35D1DF"
          fill="#35D1DF"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
