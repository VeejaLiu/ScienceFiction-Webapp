import React from 'react';
import { Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';
import BookPage from './BookPage';
import NavBarSecond, { NavBarSecondItem } from '../../common/NavBarSecond';
import AuthorPage from './AuthorPage';
import Category from './Category';
import UserPage from './UserPage';
import BookUploadPage from './BookUploadPage';

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
        <NavBarSecondItem router="author" title="作者" />
        <NavBarSecondItem router="category" title="系列" />
        <NavBarSecondItem router="user-page" title="用户" />
        <NavBarSecondItem router="user-upload-page" title="书籍上传" />
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
          <Route path={`${match.path}/author`} component={AuthorPage} />
          <Route path={`${match.path}/category`} component={Category} />
          <Route path={`${match.path}/user-page`} component={UserPage} />
          <Route path={`${match.path}/user-upload-page`} component={BookUploadPage} />
          <Redirect to={`${match.path}/book`} />
        </Switch>
      </div>
    </div>
  );
}

export default MetadataManager;
