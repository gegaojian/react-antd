import React, {Component} from 'react';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import './Home.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50
  }
});

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (<FlatButton {...this.props} label="Login"/>);
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={< IconButton > <MoreVertIcon/> </IconButton>}
    targetOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}
    anchorOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}>
    <MenuItem primaryText="Refresh"/>
    <MenuItem primaryText="Help"/>
    <MenuItem primaryText="Sign out"/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';

export default class Home extends Component {
  state = {
    logged: true
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  _handleClick() {
    this.setState({
      count: ++this.state.count
    });
  }

  render() {
    return (
      <div>
        this is home~
        <br/>
        当前计数：{this.state.count}<br/>
        <button onClick={() => this._handleClick()}>自增</button>

        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Toggle
              label="Logged"
              defaultToggled={true}
              onToggle={this.handleChange}
              labelPosition="right"
              style={{
              margin: 20
            }}/>
            <AppBar
              title="My AppBar"
              iconElementLeft={<IconButton> <NavigationClose/> </IconButton>}
              iconElementRight={this.state.logged
              ? <Logged/>
              : <Login/>}/>
            <div className="demo">
              <p>Hello Home css</p>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}