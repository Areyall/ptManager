import { useAppSelector } from '@/store';
import React from 'react';
import  {StatsItem, SecondaryStats } from './StatsItem';

function StatContainer({ stats }: any) {
  const statsCardsMain = [
    {
      id: 'a01',
      title: 'Pending',
      count: stats['Pending'] || 0,
      icon: 'req',
      color: 'bg-blue-300',
    },
    {
      id: 'a02',
      title: 'Interview',
      count: stats['Interview'] || 0,
      icon: 'check',
      color: 'bg-accent',
    },
    {
      id: 1,
      title: 'Aproved',
      count: stats['Aproved'] || 0,
      icon: 'aprove',
      color: 'bg-success',
    },
  ];

  const statsCardsSecondary = [
    {
      id: 2,
      title: 'Connected',
      count: stats['Connected'] || 0,
      icon: 'bug',
      color: 'bg-warning',
    },

    {
      id: 3,
      title: 'Feedback',
      count: stats['Feedback'] || 0,
      icon: 'plus',
      color: 'bg-warning',
    },
    {
      id: 'a03',
      title: 'Declined',
      count: stats['Declined'] || 0,
      icon: 'decline',
      color: 'bg-red-300',
    },
   
  ];
  return (
    <div className="m-auto flex max-w-4xl pt-4 flex-col gap-4">
      <div className="flex flex-row gap-4">
        {statsCardsMain?.map((stat: any) => (
          <StatsItem
            icon={stat.icon}
            key={stat.id}
            title={stat.title}
            number={stat.count}
            color={stat.color}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2">
        {statsCardsSecondary?.map((stat: any) => (
          <SecondaryStats
            icon={stat.icon}
            key={stat.id}
            title={stat.title}
            number={stat.count}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
}

export default StatContainer;
