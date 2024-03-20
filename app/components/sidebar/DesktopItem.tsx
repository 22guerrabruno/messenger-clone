'use client';
import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  href: string;
  lable: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}
const DesktopItem: React.FC<DesktopItemProps> = ({
  href,
  lable,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li
      onClick={handleClick}
      key={lable}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold 
      text-gray-700 hover:text-black hover:bg-gray-100`,
          active && `bg-gray-100 text-black`
        )}>
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{lable}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
