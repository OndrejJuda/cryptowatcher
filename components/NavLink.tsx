import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren } from 'react';

interface INavLinkProps {
  href: string;
  title: string;
}

const NavLink: FC<INavLinkProps> = ({ href, title }) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={href}
    >
      <h2
        className={
          `${pathname === href && 'border-b-4'} border-eerie dark:border-white hover:border-b-4 transition cursor-pointer`
        }
      >
        {title}
      </h2>
    </Link>
  );
};

export default NavLink;