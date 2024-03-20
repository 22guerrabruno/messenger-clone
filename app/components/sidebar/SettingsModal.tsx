'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../input/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';
import { HiPhoto } from 'react-icons/hi2';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

function SettingsModal({ isOpen, onClose, currentUser }: SettingsModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Somthing went wrong'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <form
        className=''
        onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Edit your public information.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                disable={isLoading}
                label='Name'
                id='name'
                required
                register={register}
                errors={errors}
              />
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Photo
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width={48}
                    height={48}
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    className='rounded-full'
                    alt='Avatar'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset='zx8cwazv'>
                    <Button
                      disabled={isLoading}
                      type='button'
                      secondary>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button
              type='submit'
              secondary
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsModal;
