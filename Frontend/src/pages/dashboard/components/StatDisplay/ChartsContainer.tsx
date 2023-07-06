import { useAppSelector } from '@/store';
import React, { useState } from 'react';
import AreaChartComponent from './AreaChart';
import BarChartsComponent from './BarChart';

function ChartsContainer() {
  const [chart, setChart] = useState(true);
  const { monthlyStats } = useAppSelector((store) => store.stats);

  return (
    <>
      <div className="my-4 flex flex-col gap-4 ">
        <button
          className="btn-accent btn-outline btn m-auto max-w-md "
          onClick={() => setChart(!chart)}
        >
          {chart ? 'Bar Chart' : 'Area Chart'}
        </button>
        {chart ? (
          <AreaChartComponent data={monthlyStats} />
        ) : (
          <BarChartsComponent data={monthlyStats} />
        )}
      </div>
    </>
  );
}

export default ChartsContainer;
