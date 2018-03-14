import React, {Component} from 'react';
import './Page1.css';
import image from './img/1.jpg';
import Bundle from 'router/Bundle';
import loadHello from 'bundle-loader?name=components/Hello/Hello!components/Hello/Hello';

const Loading = function () {
  return <div>Loading...</div>
};

const Hello = () => (
  <Bundle load={loadHello}>
    {(Hello) => <Hello/>}
  </Bundle>
)

export default class Page1 extends Component {
  state = {
    number: 1
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    loadHello(() => {})
  }

  render() {
    // const Hello1 = this.state.hello;
    return (
      <div className="page-box">
        This is Page{this.state.number}
        <Hello/>
        <img src={image}/>
      </div>
    );
  }
}