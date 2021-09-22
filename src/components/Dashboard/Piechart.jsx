import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "1",
//     chart: [1, 4],
//     fill: "#2D99FF",
//   },
// ];
const data = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 100 },
  { name: "Group C", value: 100 },
  { name: "Group D", value: 100 },
];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Piechart() {
  return (
    <ResponsiveContainer width="100%" height="200%">
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          //   paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            <Cell key={`cell-${index}`} fill="#0088FE" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
