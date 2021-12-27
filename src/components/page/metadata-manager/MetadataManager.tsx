import React from 'react';
import { Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';
import BookPage from './BookPage';
import NavBarSecond, { NavBarSecondItem } from '../../common/NavBarSecond';
import AuthorPage from './AuthorPage';
import CategoryPage from './CategoryPage';
import UserPage from './UserPage';
import FilePage from './FilePage';

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
        <NavBarSecondItem router="book-page" title="书籍" />
        <NavBarSecondItem router="author-page" title="作者" />
        <NavBarSecondItem router="category-page" title="系列" />
        <NavBarSecondItem router="file-page" title="文件" />
        <NavBarSecondItem router="user-page" title="用户" />
      </NavBarSecond>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 120px)',
          overflowY: 'scroll',
        }}
      >
        <Switch>
          <Route path={`${match.path}/book-page`} component={BookPage} />
          <Route path={`${match.path}/author-page`} component={AuthorPage} />
          <Route path={`${match.path}/category-page`} component={CategoryPage} />
          <Route path={`${match.path}/file-page`} component={FilePage} />
          <Route path={`${match.path}/user-page`} component={UserPage} />
          <Redirect to={`${match.path}/book-page`} />
        </Switch>
      </div>
    </div>
  );
}

export default MetadataManager;
