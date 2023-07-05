import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: any;
}
function BarChartsComponent({ data }: Props) {
  return (
    <div className='flex '>
      <ResponsiveContainer width={'95%'} height={200}>

      
      <BarChart  data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="newDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartsComponent;
