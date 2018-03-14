import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=pages/Home/home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=pages/Page1/page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=pages/Counter/counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=pages/UserInfo/userInfo!pages/UserInfo/UserInfo';
// import Login from 'pages/Sign/Login';
// import Page1 from 'pages/Page1/Page1';

const Loading = function () {
  return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
  <Bundle load={component}>
    {(Component) => Component
      ? <Component {...props}/>
      : <Loading/>}
  </Bundle>
);

const Child = ({match}) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

class Layout extends Component{
 
  constructor(props) {
    super(props);
  }
  render(){
    return ( <div>
      <ul>
        <li>
          <Link to="/">
            首页
          </Link>
        </li>
        <li>
          <Link to="/page1">
            Page1
          </Link>
        </li>
        <li>
          <Link to="/counter">
            Counter
          </Link>
        </li>
        <li>
          <Link to="/userinfo">UserInfo</Link>
        </li>
        <li>
          <a href="/index2.html">now-ui-kit</a>
        </li>
    
      </ul>
      <Switch>
        <Route exact path="/" component={createComponent(Home)}/>
        <Route path="/page1" component={createComponent(Page1)}/>
        <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
    
      </Switch>
    </div>)
  }
}

const getRouter = () => (
  <Router>
    <Layout></Layout>
  </Router>
);

export default getRouter;