'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  placeholder?: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  required?: boolean;
}

const MessageInput = ({
  placeholder,
  id,
  register,
  errors,
  type,
  required,
}: MessageInputProps) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        {...register(id, { required })}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
      />
    </div>
  );
};

export default MessageInput;
