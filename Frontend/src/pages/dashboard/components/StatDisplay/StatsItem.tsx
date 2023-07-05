import React from 'react';
import Icon from '../elements/icon';

interface Props {
  title: string;
  number: string;
  color: string;
  icon: string;
}

export function StatsItem({ title, number, color, icon }: Props) {
  return (
    <>
      <div className={`w-1/3 ${color} rounded-lg p-4`}>
        <div className="flex flex-row justify-between">
          <div className={`  p-8 text-5xl`}>{number}</div>
          <div className=" flex items-center ">
            <Icon icon={icon} size={'80px'} />
          </div>
        </div>
        <div className="p-4  text-3xl">{title}</div>
      </div>
    </>
  );
}
export function SecondaryStats({ title, number, color, icon }: Props) {
  return (
    <>
      <div
        className={`flex w-1/3 flex-row justify-between ${color} rounded-lg p-2 px-4`}
      >
        <div className={`  m-auto text-2xl`}>{number}</div>

        <div className="p-2  text-2xl">{title}</div>
        <div className=" flex items-center ">
          <Icon icon={icon} size={'25px'} />
        </div>
      </div>
    </>
  );
}
