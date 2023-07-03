import React from 'react';
import { Path, UseFormRegister, useForm } from 'react-hook-form';
interface Props {
    title: string;
  value: string;
  //   setValue: any;
  type: string;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  onChange: any;
  required: boolean;
}
interface IFormValues {
  company: string;
  position: string;
  jobType: string;
  jobStatus: string;
  jobStage: string;
  jobLocation: string;
  jobConnectionDate: string;
  jobComment: string;
}
function Inputs({title, value, type, register, label, onChange, required }: Props) {
  return (
    <>
      <h2>{title}:</h2>
      <input
        className="mt-0
        block w-full
      border-0
      border-b-2
      border-base-300
      bg-base-100 px-0.5 pl-3
      focus:border-black focus:ring-0"
        type={type}
        value={value}
        {...register(label, {
          onChange: onChange,
          required,
        })}
        // placeholder={newName}
      />
    </>
  );
}

export default Inputs;
