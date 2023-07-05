import { fetchJobStats } from '@/reducers/jobReducer';
import { useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect } from 'react';
import StatContainer from './components/StatDisplay/StatContainer';
import ChartsContainer from './components/StatDisplay/ChartsContainer';

function Stats() {
  const dispatch = useAppDispatch();
  const { stats, isLoading } = useAppSelector((storage) => storage.stats);
  
  useEffect(() => {
    console.log('🚀 ~ stats:', stats);
    if (isLoading === false) {
      
      dispatch(fetchJobStats())
    }
  }, [])
  

  return (
    <div className="min-h-screen bg-base-200">
      <StatContainer stats={stats} />
      <div className="">
        <ChartsContainer />
      </div>
    </div>
  );
}

export default Stats;
