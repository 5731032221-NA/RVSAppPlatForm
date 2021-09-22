import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Label,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "data1", value: 60 },
  { name: "data2", value: 10 },
];

export default function Radialbarchart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="value"
          innerRadius={40}
          outerRadius={60}
        >
          {data.map((entry, index) => {
            if (index === 1) {
              return <Cell key={`cell-${index}`} fill="#f3f6f9" />; // make sure to map the index to the colour you want
            }
            return <Cell key={`cell-${index}`} fill="red" />;
          })}
          <Label
            value={`${data[0].value}%`}
            position="center"
            fill="grey"
            style={{
              fontSize: "32px",
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
