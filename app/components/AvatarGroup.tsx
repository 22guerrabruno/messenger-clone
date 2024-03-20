'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap: { [key: number]: string } = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0 ',
    2: 'bottom-0 right-0  ',
  };

  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => (
        <div
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index]}`}
          key={user.id}>
          <Image
            src={user?.image || '/images/placeholder.jpg'}
            alt='Avatar'
            layout='fill'
            objectFit='cover'
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
