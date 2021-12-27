import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HeaderBar } from './components/common';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/bmc-main.scss';
import 'antd/dist/antd.min.css';

const MetadataManager = React.lazy(
  () => import('./components/page/metadata-manager/MetadataManager'),
);
const BookUpload = React.lazy(() => import('./components/page/book-upload/BookUpload'));
function AdminSite() {
  return (
    <Suspense fallback={null}>
      <Router>
        <HeaderBar />
        <Switch>
          <Route path="/book-upload" component={BookUpload} />
          <Route path="/metadata-manager" component={MetadataManager} />
          <Redirect to="/book-upload" />
        </Switch>
      </Router>
      <ToastContainer
        closeButton={<i className="fas fa-times my-auto ml-2" />}
        progressClassName="ToastContainer--progress"
        className="ToastContainer--container"
      />
      <Helmet>
        <title>Test</title>
      </Helmet>
    </Suspense>
  );
}

export default AdminSite;
