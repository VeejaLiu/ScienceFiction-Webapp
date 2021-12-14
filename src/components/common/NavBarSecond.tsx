import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from '../page/ExtensionPage.module.scss';
import React, { ReactNode } from 'react';

function NavBarSecond({ children }: { children: ReactNode }) {
  return (
    <nav className={styles['nav']}>
      <div className={styles['nav-container']}>{children}</div>
    </nav>
  );
}

export function NavBarSecondItem(value: { router: string; title: string }) {
  const match = useRouteMatch();
  return (
    <NavLink
      activeClassName={styles['nav-item--active']}
      className={styles['nav-item']}
      to={`${match.path}/${value.router}`}
    >
      <div>{value.title}</div>
    </NavLink>
  );
}

export default NavBarSecond;
