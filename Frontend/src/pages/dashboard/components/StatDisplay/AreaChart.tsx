import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: any;
}

function AreaChartComponent({ data }: Props) {
  return (
    <div className="flex justify-center">
      <ResponsiveContainer width={'95%'} height={200}>
        <LineChart  data={data}>
          <XAxis dataKey="newDate" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComponent;
