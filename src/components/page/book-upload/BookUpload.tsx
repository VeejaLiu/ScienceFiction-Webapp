import React from 'react';
import { Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';
import NavBarSecond, { NavBarSecondItem } from '../../common/NavBarSecond';
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
        <NavBarSecondItem router="book-upload-page" title="书籍上传" />
      </NavBarSecond>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 120px)',
          overflowY: 'scroll',
        }}
      >
        <Switch>
          <Route path={`${match.path}/book-upload-page`} component={BookUploadPage} />
          <Redirect to={`${match.path}/book-upload-page`} />
        </Switch>
      </div>
    </div>
  );
}

export default MetadataManager;
