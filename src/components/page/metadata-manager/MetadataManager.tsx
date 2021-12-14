import React from 'react';
import { Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';
import Book from './Book';
import NavBarSecond, { NavBarSecondItem } from '../../common/NavBarSecond';
import Author from './Author';
import Category from './Category';
import AllUser from './AllUser';

function MetadataManager() {
  const match = useRouteMatch();

  return (
    <div
      style={{
        position: 'fixed',
        marginTop: '60px',
        height: '50px',
        width: '100%',
        borderBottom: '1px solid #999',
      }}
    >
      <NavBarSecond>
        <NavBarSecondItem router="book" title="书籍" />
        <NavBarSecondItem router="author" title="作者" />
        <NavBarSecondItem router="category" title="系列" />
        <NavBarSecondItem router="allUser" title="用户" />
      </NavBarSecond>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 120px)',
          overflowY: 'scroll',
        }}
      >
        <Switch>
          <Route path={`${match.path}/book`} component={Book} />
          <Route path={`${match.path}/author`} component={Author} />
          <Route path={`${match.path}/category`} component={Category} />
          <Route path={`${match.path}/allUser`} component={AllUser} />
          <Redirect to={`${match.path}/book`} />
        </Switch>
      </div>
    </div>
  );
}

export default MetadataManager;
