import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, IndexRouter} from 'react-router-dom';
import Bundle from './Bundle';

import Index from 'pages/Index/Index.js';
import Home from 'bundle-loader?lazy&name=pages/Home/home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=pages/Page1/page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=pages/Counter/counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=pages/UserInfo/userInfo!pages/UserInfo/UserInfo';

const Loading = function () {
  return <div>Loading...</div>
};

const createComponent = (component) => () => (
  <Bundle load={component}>
    {(Component) => Component
      ? <Component/>
      : <Loading/>}
  </Bundle>
);

const DefaultLayout = ({component: Component,...rest}) => {
  return (
    <Component {...rest}>
      <Route exact path="/" component={createComponent(Home)}/>
      <Route path="/page1" component={createComponent(Page1)}/>
      <Route path="/counter" component={createComponent(Counter)}/>
      <Route path="/userinfo" component={createComponent(UserInfo)}/>
    </Component>
  )
};

const getRouter = () => (
  <Router>
    <Switch>
      <DefaultLayout component={Index}></DefaultLayout>
    </Switch>
  </Router>
);

export default getRouter;